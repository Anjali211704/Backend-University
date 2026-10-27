
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from .models import Task


# READ - Display all tasks
def task_list(request):
    tasks = Task.objects.all().order_by('-created_at')

    return render(
        request,
        'todo/task_list.html',
        {'tasks': tasks}
    )


# CREATE - Add a new task
def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()

        if title:
            Task.objects.create(title=title)
            return redirect('task_list')

        return render(
            request,
            'todo/add_task.html',
            {'error': 'Please enter a task title.'}
        )

    return render(request, 'todo/add_task.html')


# UPDATE - Mark task completed/incomplete
@require_POST
def toggle_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    task.completed = not task.completed
    task.save()

    return redirect('task_list')


# DELETE - Delete a task
@require_POST
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    task.delete()

    return redirect('task_list')
