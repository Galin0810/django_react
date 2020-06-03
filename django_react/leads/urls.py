from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    url(r'^api/leads/$', views.LeadListCreate.as_view()),
    url(r'^api/leads/(?P<id>[0-9]+)$', views.leads_detail),

]