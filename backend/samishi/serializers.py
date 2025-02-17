from rest_framework import serializers
from .models import Samishi

class SamishiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samishi
        fields = ('id', 'title', 'description', 'completed')