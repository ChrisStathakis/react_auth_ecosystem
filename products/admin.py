from django.contrib import admin

from .models import Product, Brand, Vendor


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass



@admin.register(Vendor)
class ProductsdfAdmin(admin.ModelAdmin):
    pass



@admin.register(Brand)
class ProductvcAdmin(admin.ModelAdmin):
    pass
