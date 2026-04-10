from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet)
router.register(r'students', StudentViewSet)
router.register(r'mentors', MentorViewSet)
router.register(r'colleges', CollegeViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'domains', DomainViewSet)
urlpatterns = [

    path('login/', login_view),
    path('protected/', protected_view),

    # USERS
    path('users/', get_users),
    path('approve/<int:id>/', approve_application),
    path('create-account/<str:token>/', create_account),

    # APPLICATIONS (AUTO HANDLED BY ROUTER) students 
    path('', include(router.urls)),



    # DROPDOWNS
    path('domains/', get_domains),
    path('colleges/', get_colleges),
    path('courses/', get_courses),
    path('dashboard/', dashboard_stats),
]