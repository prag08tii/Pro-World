
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
import uuid
from django.conf import settings
from django.core.mail import send_mail
from .models import Application, Domain, Student, Course, College, Mentor,User
from .serializers import (
    UserSerializer,
    ApplicationSerializer,
    StudentSerializer,
    DomainSerializer,
    CourseSerializer,
    CollegeSerializer,
    MentorSerializer
)

User = get_user_model()

# 🔐 LOGIN
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    if not user.check_password(password):
        return Response({"error": "Invalid password"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": user.role,
        "email": user.email
    })


# 🔒 PROTECTED
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "Authenticated"})


# 👥 USERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    if request.user.role != "admin":
        return Response({"error": "Unauthorized"}, status=403)

    users = User.objects.all()
    return Response(UserSerializer(users, many=True).data)


# 🚀 APPLICATION VIEWSET
class ApplicationViewSet(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]


# 🎓 STUDENT VIEWSET (🔥 THIS FIXES YOUR ISSUE)
class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Student.objects.all()

        college = self.request.query_params.get('college')
        domain = self.request.query_params.get('domain')
        course = self.request.query_params.get('course')
        sort = self.request.query_params.get('sort')

        if college:
            queryset = queryset.filter(college_id=int(college))

        if domain:
            queryset = queryset.filter(domain_id=domain)

        if course:
            queryset = queryset.filter(course_id=course)

        if sort:
            queryset = queryset.order_by(sort)

        return queryset


# 🎯 DROPDOWNS
@api_view(['GET'])
@permission_classes([AllowAny])
def get_domains(request):
    domains = Domain.objects.all()
    return Response(DomainSerializer(domains, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_courses(request):
    courses = Course.objects.all()
    return Response(CourseSerializer(courses, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_colleges(request):
    colleges = College.objects.all()
    return Response(CollegeSerializer(colleges, many=True).data)

# 🎓 MENTOR VIEWSET (🔥 THIS FIXES YOUR ISSUE)
class MentorViewSet(ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Mentor.objects.all()

        college = self.request.query_params.get('college')
        if college:
            queryset = queryset.filter(college_id=int(college))
        return queryset
    
class CollegeViewSet(ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    permission_classes = [AllowAny]    
    
class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Course.objects.all()

        sort = self.request.query_params.get('sort')
        if sort:
            queryset = queryset.order_by(sort)

        return queryset
# Domain ViewSet
class DomainViewSet(ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Domain.objects.all()

        sort = self.request.query_params.get('sort')
        if sort:
            queryset = queryset.order_by(sort)

        return queryset  
# Dashboard Stats
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):

    # 📄 APPLICATION STATS
    total_applications = Application.objects.count()
    approved = Application.objects.filter(status='approved').count()
    pending = Application.objects.filter(status='pending').count()
    rejected = Application.objects.filter(status='rejected').count()

    # 🎓 STUDENT STATS
    total_students = Student.objects.count()

    students_per_college = Student.objects.values(
        'college__name'
    ).annotate(count=Count('id'))

    # 🏫 SYSTEM COUNTS
    total_colleges = College.objects.count()
    total_domains = Domain.objects.count()
    total_courses = Course.objects.count()
    total_mentors = Mentor.objects.count()
    total_users = User.objects.count()

    # 📚 COURSE → COLLEGE COUNT
    courses = Course.objects.annotate(
        college_count=Count('colleges')
    ).values('name', 'college_count')

    return Response({
        "applications": {
            "total": total_applications,
            "approved": approved,
            "pending": pending,
            "rejected": rejected
        },
        "students": {
            "total": total_students,
            "by_college": list(students_per_college)
        },
        "system": {
            "colleges": total_colleges,
            "domains": total_domains,
            "courses": total_courses,
            "mentors": total_mentors,
            "users": total_users
        },
        "courses": list(courses)
    })      
#approve logic
@api_view(['POST'])
def approve_application(request, id):
    try:
        app = Application.objects.get(id=id)

        if app.status == "approved":
            return Response({"message": "Already approved"})

        app.status = "approved"

        # generate token
        token = str(uuid.uuid4())
        app.token = token
        app.save()

        # activation link
        link = f"http://localhost:8080/create-account/{token}"

        # send email
        send_mail(
            subject="Application Approved 🎉",
            message=f"""
Hello {app.name},

Your application is approved!

Create your account here:
{link}
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[app.email],
        )

        return Response({"message": "Approved + Email sent"})

    except Application.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    
#create account logic
@api_view(['POST'])
@permission_classes([AllowAny])
def create_account(request, token):
    try:
        app = Application.objects.get(token=token)

        if app.status != "approved":
            return Response({"error": "Application not approved"}, status=400)

        # check if already created
        if User.objects.filter(email=app.email).exists():
            return Response({"error": "Account already exists"}, status=400)

        password = request.data.get("password")

        # 🔥 CREATE USER
        user = User.objects.create(
            email=app.email,
            role="student"
        )
        user.set_password(password)
        user.save()

        # 🔥 CREATE STUDENT
        Student.objects.create(
            user=user,
            name=app.name,
            email=app.email,
            domain=app.domain,
            course=app.course,
            college=app.college
        )

        return Response({"message": "Account created successfully"})

    except Application.DoesNotExist:
        return Response({"error": "Invalid token"}, status=404)