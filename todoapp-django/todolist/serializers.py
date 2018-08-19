from rest_framework import serializers
from .models import Category, TodoList


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TodoListSerializers(serializers.ModelSerializer):
    class Meta:
        model = TodoList  
        fields = '__all__'      