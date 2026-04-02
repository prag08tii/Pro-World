# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('mentor', 'Mentor'),
        ('student', 'Student'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    college = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username

class Domain(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Application(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    roll_no = models.CharField(max_length=50)
    college = models.CharField(max_length=255)

    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)

    status = models.CharField(
        max_length=20,
        choices=(('pending', 'Pending'), ('approved', 'Approved')),
        default='pending'
    )

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    roll_no = models.CharField(max_length=50)
    college = models.CharField(max_length=255)

    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)

    def __str__(self):
        return self.name       

class Mentor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Application)
def create_student_on_approval(sender, instance, created, **kwargs):
    if instance.status == 'approved':
        if not Student.objects.filter(email=instance.email).exists():
            Student.objects.create(
                name=instance.name,
                email=instance.email,
                roll_no=instance.roll_no,
                college=instance.college,
                domain=instance.domain
            )    