from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from SPARQLWrapper import SPARQLWrapper
from string import Template
import json

PREDEFINED_QUERIES = {
    1: {#recupera qunati archi narrativi ha ogni serie dell’ontologia 
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
    2: {#tutti i target di tutte le serie
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?x ?target 
            WHERE {
                ?x jm:haTarget ?target
            }
        """,
        'required_params': ['']
    },
    3: {#il dato anime ha target shonen
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            ASK {jm:$animeTitle jm:haTarget jm:Shonen}
        """,
        'required_params': ['animeTitle']
    },
    4: {#chi e’ l’autore di un dato manga
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?autore
            WHERE { 
                jm:$mangaTitle jm:haAutore ?autore .
            }
        """,
        'required_params': ['mangaTitle']
    },
    5: {#quali archi contiene un dato manga
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?arco
            WHERE { 
                jm:$mangaTitle jm:haArcoNarrativo ?arco
            }
        """,
        'required_params': ['mangaTitle']
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
}

r2= {  'results': [
        {
            'arco': 'Assassinio del portatore della spada',
            'autore': 'kon'
        },
        {
            'arco': 'Rakuzaichi' 
        },
        {
            'arco': 'Versus Shojo'
        },
]}

SPARQL_ENDPOINT = "http://Omen-Di-Fratta:7200/repositories/ProgettoMODSEM"

#Disabilita la protezione CSRF(Cross-Site Request Forgery) per questa funzione 
@csrf_exempt 

def query_sparql(request):
  try:
    data = json.loads(request.body) 
    id = data.get('id')
    parameters = data.get('parameters')
    
    #Recupera la query predefinita
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

    #Esegue la query  
    results = sparql.query().convert()

    # Trasformazione risultati in formato più gestibile
    parsed_results = []
    # results = [{'arco': {'type': 'uri', 'value': 'http://www.semanticweb.org/japanese-media/Assassinio_del_portatore_della_spada'}},
    #  {'arco': {'type': 'uri', 'value': 'http://www.semanticweb.org/japanese-media/Rakuzaichi'}}, 
    #  {'arco': {'type': 'uri', 'value': 'http://www.semanticweb.org/japanese-media/Versus_Shojo'}},
    # #  {'autore': {'type': 'uri', 'value': 'http://www.semanticweb.org/japanese-media/kon'}}
    #  ]

    for result in results:
        for key, value in result.items():
            parsedValue = value['value'].split("/")[-1].replace("_", " ")  
            parsed_results.append({key : parsedValue})

    print(parsed_results)
    
    return JsonResponse({'results': parsed_results,})

    # return JsonResponse(r2)

  except Exception as e:
    return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)
    
