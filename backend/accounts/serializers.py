from rest_framework import serializers
from .models import User, Application, Student, Domain, College, Course, Mentor


# 👤 USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role']


# 🌐 DOMAIN
class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ['id', 'name', 'description']



# 🏫 COLLEGE
class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name']


# 📚 COURSE
class CourseSerializer(serializers.ModelSerializer):

    # READ
    college_names = serializers.StringRelatedField(
        source='colleges',
        many=True,
        read_only=True
    )

    # WRITE
    colleges = serializers.PrimaryKeyRelatedField(
        queryset=College.objects.all(),
        many=True
    )

    class Meta:
        model = Course
        fields = ['id', 'name', 'colleges', 'college_names']


# 📄 APPLICATION
class ApplicationSerializer(serializers.ModelSerializer):

    college_name = serializers.CharField(source='college.name', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    domain_name = serializers.CharField(source='domain.name', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'


# 🎓 STUDENT
class StudentSerializer(serializers.ModelSerializer):

    # READ
    college_name = serializers.CharField(source='college.name', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    domain_name = serializers.CharField(source='domain.name', read_only=True)

    # WRITE (🔥 VERY IMPORTANT)
    college = serializers.PrimaryKeyRelatedField(queryset=College.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    domain = serializers.PrimaryKeyRelatedField(queryset=Domain.objects.all())

    class Meta:
        model = Student
        fields = [
            'id',
            'name',
            'email',
            'roll_no',
            'mobile_no',
            'college',
            'college_name',
            'course',
            'course_name',
            'domain',
            'domain_name'
        ]
# 👨‍🏫 MENTOR
class MentorSerializer(serializers.ModelSerializer):

    college_name = serializers.CharField(source='college.name', read_only=True)

    college = serializers.PrimaryKeyRelatedField(queryset=College.objects.all())

    class Meta:
        model = Mentor
        fields = [
            'id',
            'name',
            'email',
            'mobile_no',
            'college',
            'college_name'   # 🔥 ADD THIS
        ]