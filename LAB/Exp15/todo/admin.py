
from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):

    # Display these columns in the admin panel
    list_display = ('title', 'completed', 'created_at')

    # Filter tasks based on completion status
    list_filter = ('completed',)

    # Search tasks using their titles
    search_fields = ('title',)

    # Allow completion status to be edited directly
    list_editable = ('completed',)
