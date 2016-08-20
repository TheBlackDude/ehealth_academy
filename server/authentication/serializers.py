from django.contrib.auth import update_session_auth_hash
from restframework import serializers
from .models import Account


# Serialize User credentials
class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = (
            'id', 'email', 'username', 'created_at', 'updated_at',
            'password', 'confirm_password'
        )
        read_only_fields = ('created_at', 'updated_at')
        
        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get(
                                'username', instance.username
                                )
            instance.save()

            password = validated_data.get('password', None)
            confirm_pass = validated_data.get(
                               'confirm_password', None
                               )
            if password and confirm_pass and password == confirm_pass:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(
                self.context.get('request'), instance
            )

            return instance
