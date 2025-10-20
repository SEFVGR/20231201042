from django.shortcuts import render

# Create your views here.

def singlepage(request):
    return render(request, 'singlepage.html')
