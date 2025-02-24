from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from SPARQLWrapper import SPARQLWrapper
from string import Template
import json

#URL dell'endpoint GraphDB su cui saranno eseguite le query sparql
SPARQL_ENDPOINT = "http://Omen-Di-Fratta:7200/repositories/ProgettoMODSEM"

PREDEFINED_QUERIES = {
    1: {# Quale studio ha animato un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    },
    2: {# Qual è il target di un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    },
    3: {# Quali anime hanno un dato target
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['target']
    },
    4: {# Quali anime ha prodotto un dato studio d'animazione
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['studio']
    },
    5: {# Chi ha diretto un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    },
    6: {# Chi ha doppiato un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    },
    7: {# Quali anime hanno partecipato ad un dato award
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['award']
    },
    8: {# Quali anime sono stagionali
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

        """,
        'required_params': ['']
    },
    9: {# È in produzione un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?autore
            WHERE { 
                jm:$mangaTitle jm:haAutore ?autore .
            }
        """,
        'required_params': ['animeTitle']
    },
    10: {# Quanti episodi ha un dato anime 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

        """,
        'required_params': ['animeTitle']
    },
    19: {#quali archi narrativi contiene un dato manga
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?arco
            WHERE { 
                jm:$mangaTitle jm:haArcoNarrativo ?arco
            }
        """,
        'required_params': ['mangaTitle']
    },
    20: {#
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

        """,
        'required_params': ['']
    },
    21: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    22: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    23: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    24: {# 
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    }
}

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

    for result in results:
        for key, value in result.items():
            parsedValue = value['value'].split("/")[-1].replace("_", " ")  
            parsed_results.append({key : parsedValue})

    print(parsed_results)
    
    return JsonResponse({'results': parsed_results,})

  except Exception as e:
    return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)
    
