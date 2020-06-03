from .models import Lead
from django.contrib import admin


@admin.register(Lead)
class AuthorAdmin(admin.ModelAdmin):
    pass
