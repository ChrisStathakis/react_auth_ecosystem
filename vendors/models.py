from django.db import models
from django.db.models import Sum
from django.conf import settings
from django.shortcuts import reverse
from django.db.models.signals import post_delete
from django.dispatch import receiver

from tinymce.models import HTMLField
from decimal import Decimal
from frontend.models import PaymentMethod

# Create your models here.


CURRENCY = settings.CURRENCY
TAXES_CHOICES = (
    ('a', 0),
    ('b', 13),
    ('c', 24)
)
