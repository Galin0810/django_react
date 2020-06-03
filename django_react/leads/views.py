from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Lead
from .serializers import *


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


@api_view(['GET', 'POST'])
def leads_list(request):
    """
 List  customers, or create a new customer.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        leads = Lead.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(leads, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = LeadSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/leads/?page=' + str(nextPage),
                         'prevlink': '/api/leads/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def leads_detail(request, id):
    """
 Retrieve, update or delete a customer by id/pk.
 """
    try:
        lead = Lead.objects.get(id=id)
    except Lead.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LeadSerializer(lead, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = LeadSerializer(lead, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        lead.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
