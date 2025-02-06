from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json

PREDEFINED_QUERIES = {
    1: {
        'query': """
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        
        SELECT ?name ?studio WHERE {{
            ?person a foaf:Person .
            ?person foaf:name ?name .
            ?person <http://example.com/ontology#studio> ?studio 
            FILTER(CONTAINS(LCASE(?studio), LCASE("{studio_param}")))
        }}
        """,
        'required_params': ['studio_param']
    },
    2: {
        'query': """
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bibo: <http://purl.org/ontology/bibo/>
        
        SELECT ?title ?series WHERE {{
            ?book a bibo:Book .
            ?book bibo:title ?title .
            ?book <http://example.com/ontology#series> ?series
            FILTER(CONTAINS(LCASE(?series), LCASE("{serie_param}")))
        }}
        """,
        'required_params': ['serie_param']
    }
}
r1 = {
    "results": [
        {
            "name": "Mario Rossi",
            "studio": "Studio Ghibli"
        },
        {
            "name": "Luigi Bianchi", 
            "studio": "Pixar Animation"
        }
    ],
    "status": "success",
    "total_results": 2
}
r2 = {
    "results": [],
    "status": "success",
    "total_results": 0
}
SPARQL_ENDPOINT = ""

@csrf_exempt # Disabilita la protezione CSRF(Cross-Site Request Forgery) per questa funzione 
def query_sparql(request):
  try:
    data = json.loads(request.body) 
    id = data.get('id')
    parameters = data.get('parameters')
    
    # Recupera la query predefinita
    query_template = PREDEFINED_QUERIES[id]['query']
    required_params = PREDEFINED_QUERIES[id]['required_params']

    # Verifica i parametri richiesti
    for param in required_params:
        if param not in parameters or not parameters[param]:
            return JsonResponse({
                'error': f'Parametro mancante: {param}', 
                'status': 'error'
            }, status=400)

    # Formatta la query con i parametri
    formatted_query = query_template.format(**parameters)

    # return JsonResponse({"results": f"Query ricevuta"}, status=200)
    # return JsonResponse({"results": }, status=200)
    return JsonResponse(r2)

  except Exception as e:
    return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)
    


        # Configurazione endpoint SPARQL
        # sparql = SPARQLWrapper("http://your-sparql-endpoint.com/sparql")
        # sparql.setQuery(formatted_query)
        # sparql.setReturnFormat(JSON)

        # Esecuzione query
        # results = sparql.query().convert()

        # Trasformazione risultati in formato più gestibile
        # parsed_results = []
        # for result in results['results']['bindings']:
        #     parsed_result = {}
        #     for key, value in result.items():
        #         parsed_result[key] = value['value']
        #     parsed_results.append(parsed_result)

        # return JsonResponse({
        #     'results': parsed_results,
        #     'status': 'success',
        #     'total_results': len(parsed_results)
        # })