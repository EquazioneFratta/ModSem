from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from SPARQLWrapper import SPARQLWrapper
from string import Template
from .predefined_queries_list import PREDEFINED_QUERIES
import json

#URL dell'endpoint GraphDB su cui saranno eseguite le query sparql
SPARQL_ENDPOINT = "http://Omen-Di-Fratta:7200/repositories/ProgettoMODSEM"

#Disabilita la protezione CSRF(Cross-Site Request Forgery) per questa funzione 
@csrf_exempt 

def query_sparql(request):
  try:
    #Riceve la query inviata dal front-end
    data = json.loads(request.body) 
    #Identifica unicamente la query richiesta dall'utente nel front-end
    id = data.get('id')
    #Parametri inviati dal front-end, necessari per fare una query parametrica
    parameters = data.get('parameters')
    
    #Recupera la query predefinita e i suoi parametri
    query_template = Template(PREDEFINED_QUERIES[id]['query'])
    required_params = PREDEFINED_QUERIES[id]['required_params']

    #Verifica che i parametri richiesti siano stati inseriti
    for param in required_params:
        if param not in parameters or not parameters[param]:
            return JsonResponse({
                'error': f'Parametro mancante: {param}', 
                'status': 'error'
            }, status=400)

    #Formatta la query con i parametri inseriti dall'utente
    formatted_query = query_template.substitute(parameters)

    sparql = SPARQLWrapper(SPARQL_ENDPOINT)

    sparql.setQuery(formatted_query)
    sparql.setReturnFormat("json")

    #Esegue la query e salva la risposta nella variabile "results"
    results = sparql.query().convert()
    
    #Trasforma "results", rendendolo piu' semplice da gestire
    parsed_results = []
    for result in results["results"]["bindings"]:
        parsed_results.append({key: value['value'].split("/")[-1].replace("_", " ")  for key, value in result.items()})
    
    return JsonResponse({'results': parsed_results,})

  except Exception as e:
    return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)
    
