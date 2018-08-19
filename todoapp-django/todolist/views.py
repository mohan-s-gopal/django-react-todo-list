from django.shortcuts import render,redirect
from .models import TodoList, Category
from rest_framework import viewsets
from .serializers import TodoListSerializers, CategorySerializers

class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializers

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers

