# Register your models here.
from django.contrib import admin
from .models import College, Course, User, Domain, Application, Student, Mentor

admin.site.register(User)
admin.site.register(Domain)
admin.site.register(Application)
admin.site.register(Student)
admin.site.register(Mentor)
admin.site.register(Course)
admin.site.register(College)