from django.http import JsonResponse
from django.shortcuts import render
from string import Template
from django.views.decorators.csrf import csrf_exempt
import json

PREDEFINED_QUERIES = {
    1: { #recupera qunati archi narrativi ha ogni serie dell’ontologia 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            PREFIX odp: <http://www.ontologydesignpatterns.org/cp/owl/collectionentity.owl#>
            SELECT ?manga (COUNT(?arco) AS ?numeroArchi)
            WHERE {
                ?manga jm:haArcoNarrativo ?arco;
            }
            GROUP BY ?manga
            ORDER BY ?manga
        """,
        'required_params': ['']
    },
    2: { #tutti i target di tutte le serie
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?x ?target 
            WHERE {
                ?x jm:haTarget ?target
            }
        """,
        'required_params': ['']
    },
    3: { #il dato anime ha target shonen
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            ASK {jm:{anime} jm:haTarget jm:Shonen}
        """,
        'required_params': ['animeTitle']
    },
    4: {#chi e’ l’autore di un dato manga
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?autore
            WHERE { 
                jm:{manga} jm:haAutore ?autore .
            }
        """,
        'required_params': ['mangaTitle']
    },
    5: {# quali archi contiene un dato manga
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?arco
            WHERE { 
                jm:{manga} jm:haArcoNarrativo ?arco
            }
        """,
        'required_params': ['manga']
    },
    6: {#qual e’ il manga shonen con meno archi narrativi
        'query': """
        PREFIX jm: <http://www.semanticweb.org/japanese-media/>

        SELECT ?manga (COUNT(?arco) AS ?numeroArchi)
        WHERE {
            ?manga a jm:MangaSerie ;
                jm:haTarget jm:Shonen ;
                jm:haArcoNarrativo ?arco .
        }
        GROUP BY ?manga
        ORDER BY ASC(?numeroArchi)
        LIMIT 1
        """,
        'required_params': ['']
    },
    7: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    8: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    9: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    10: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
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
    # query_template = PREDEFINED_QUERIES[id]['query']
    required_params = PREDEFINED_QUERIES[id]['required_params']
    print(required_params)
    query_template = Template("""
      PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?autore
            WHERE { 
                jm:$mangaTitle jm:haAutore ?autore .
            }
    """)

    # Verifica i parametri richiesti
    for param in required_params:
        if param not in parameters or not parameters[param]:
            return JsonResponse({
                'error': f'Parametro mancante: {param}', 
                'status': 'error'
            }, status=400)

    # Formatta la query con i parametri
    # formatted_query = query_template.format(**parameters)
    formatted_query = query_template.substitute(parameters)

    print(formatted_query)

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

    # return JsonResponse({"results": f"Query ricevuta"}, status=200)
    # return JsonResponse({"results": }, status=200)
    return JsonResponse(r2)

  except Exception as e:
    return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)
    
