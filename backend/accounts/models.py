from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


# 🏫 COLLEGE MODEL
class College(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# 📚 COURSE MODEL (FIXED)
class Course(models.Model):
    name = models.CharField(max_length=100)
    # 🔥 MANY TO MANY
    colleges = models.ManyToManyField(College, related_name='courses')

    def __str__(self):
        return f"{self.name} ({', '.join([c.name for c in self.colleges.all()])})"


# 👤 USER MODEL
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('mentor', 'Mentor'),
        ('student', 'Student'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username


# 🌐 DOMAIN MODEL
class Domain(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


# 📄 APPLICATION MODEL
class Application(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    roll_no = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15, blank=True, null=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=(('pending', 'Pending'), ('approved', 'Approved'),('rejected', 'Rejected'), ),
        default='pending'
    )

    def __str__(self):
        return self.name


# 🎓 STUDENT MODEL
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    roll_no = models.CharField(max_length=50)
    mobile_no = models.CharField(max_length=15, blank=True, null=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# 👨‍🏫 MENTOR MODEL
class Mentor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile_no = models.CharField(max_length=15, blank=True, null=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



