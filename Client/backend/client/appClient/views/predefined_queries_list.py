PREDEFINED_QUERIES = {
    
    #  --- Query anime --- #
    
    1: {# Quale studio ha animato un dato anime
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?studio
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:prodottoDa ?studio .
                FILTER (STR(?label) = $animeTitle)
            }         
        """,
        'required_params': ['animeTitle']
    },
    
    2: {# Qual è il target di un dato anime
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?target
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:haTarget ?target .
                FILTER (STR(?label) = $animeTitle)
            }        
        """,
        'required_params': ['animeTitle']
    },
    
    3: {# Quali anime hanno un dato target
        'query': """
           PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?anime rdfs:label ?label .
                jm:$target jm:èTargetDi ?anime .
                FILTER (STR(?label) = ?anime)
            }
        """,
        'required_params': ['target']
    },
    
    4: {# Quali anime ha prodotto un dato studio d'animazione
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?anime rdfs:label ?label .
                jm:$studio jm:haProdotto ?anime .
                FILTER (STR(?label) = ?anime)
            }
        """,
        'required_params': ['studio']
    },
    
    5: {# Chi ha diretto un dato anime
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?regista
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:direttoDa ?regista .
                FILTER (STR(?label) = $animeTitle)
            }
        """,
        'required_params': ['animeTitle']
    },
    
    6: {# Chi ha doppiato un dato anime
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?VoiceActor
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:èDoppiatoDa ?VoiceActor .
                FILTER (STR(?label) = $animeTitle)
            }        """,
        'required_params': ['animeTitle']
    },
    
    7: {# Quali anime hanno partecipato ad un dato award
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?anime rdfs:label ?label .
                jm:$award jm:hasPartecipant ?anime .
                FILTER (STR(?label) = ?anime)
            }        
        """,
        'required_params': ['award']
    },
    
    8: {# Quali anime sono stagionali
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:èStagionale true
                FILTER (STR(?label) = ?anime)
            }         
        """,
        'required_params': ['']
    },
    
    9: {# È in produzione un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT inProd
            WHERE {
                ?anime rdfs:label ?label .
                ?anime jm:inProduzione ?inProd . 
                FILTER (STR(?label) = $animeTitle)
            }
        """,
        'required_params': ['animeTitle']
    },
    
    10: {# Quanti episodi ha un dato anime 
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?numEp
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:numeroEpisodi ?numEp .
                FILTER (STR(?label) = $animeTitle)
            }
        """,
        'required_params': ['animeTitle']
    },
    
    #  --- Query manga --- #
    
    11: {# Chi è l'autore di un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?autore
            WHERE { 
             ?manga rdfs:label ?label .
             ?manga jm:haAutore ?autore .
             FILTER (STR(?label) = $mangaTitle)
            }
        """,
        'required_params': ['mangaTitle']
    },
    
    12: {# Quanti volumi ha un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?numVol
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:numeroEpisodi ?numVol .
                FILTER (STR(?label) = $mangaTitle)
            }
        """,
        'required_params': ['mangaTitle']
    },
    
    13: {# Quale casa editrice detiene i diritti di un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?casaEditrice
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:sottoLicenzaDi ? casaEditrice.
                FILTER (STR(?label) = $mangaTitle)
            }
        """,
        'required_params': ['mangaTitle']
    },
    14: {# Quali manga sono sotto licenza di una data casa editrice
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?manga rdfs:label ?label .
                jm:$casaEditrice jm:detieneDiritti ?manga .
                FILTER (STR(?label) = ?manga)
            }
        """,
        'required_params': ['casaEditrice']
    },
    
    15: {# Su quale rivista è pubblicato un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?rivista
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:pubblicatoIn ?rivista .
                FILTER (STR(?label) = $mangaTitle)
            }            
        """,
        'required_params': ['mangaTitle']
    },
    
    16: {# Quali manga ha pubblicato una data rivista
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?manga
            WHERE { 
                ?manga rdfs:label ?label .
                jm:$rivista jm:pubblica ?manga .
                FILTER (STR(?label) = ?manga)
            }   
        """,
        'required_params': ['rivista']
    },
    
    17: {# Quali manga sono in produzione
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?label
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:inProduzione ?true .
                FILTER (STR(?label) = ?manga)
            } 
        """,
        'required_params': ['']
    },
    
    18: {# Qual è il target di un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?target
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:haTarget ?target .
                FILTER (STR(?label) = $mangaTitle)
            }     
        """,
        'required_params': ['mangaTitle']
    },  
      
    19: {# Quali archi narrativi contiene un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?arco
            WHERE { 
                ?manga rdfs:label ?label .
                ?manga jm:haArcoNarrativo ?arco
                FILTER (STR(?label) = $mangaTitle)
            }
        """,
        'required_params': ['mangaTitle']
    },
    
    20: {# Esiste un adattamento anime di un dato manga
        # TODO: manca
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

        """,
        'required_params': ['mangaTitle']
    },
    
    21: {# Quali manga hanno anche un adattamento anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['']
    },
    
    #  --- Query persone --- #

    22: {# Chi sono i colleghi di una data persona
        # TODO: stessa cosa della query 27
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?staff
            WHERE { 
                jm:$persona jm:haLavoraCon ?staff
            }       
        """,
        'required_params': ['persona']
    },
    
    23: {# Di quale studio d'animazione è dipendente una data persona
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?studio
            WHERE { 
                jm:$persona jm:dipendenteDi ?studio
            }          
        """,
        'required_params': ['persona']
    },
    
    24: {# Chi sono i dipendenti di un dato studio d'animazione
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?staff
            WHERE { 
                jm:$studio jm:haDipendente ?staff
            }   
        """,
        'required_params': ['studio']
    },
    
    25: {# Cosa ha diretto una data persona
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?anime
            WHERE { 
                jm:$persona jm:haDiretto ?anime
            }   
        """,
        'required_params': ['persona']
    },
    
    26: {# Cosa ha doppiato una data persona
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?anime
            WHERE { 
                jm:$persona jm:haDoppiato ?anime
            }   
        """,
        'required_params': ['persona']
    },
    
    27: {# Con chi ha lavorato una data persona
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['persona']
    },
    
    28: {# Cosa ha scritto una data persona
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?manga
            WHERE { 
                jm:$persona jm:haScritto ?manga
            }   
        """,
        'required_params': ['persona']
    },
    
    #  --- Query endpoint pubblico --- #

    29: {# Chi sono i doppiatori in una dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    },
    
    30: {# Quali comics pubblica una data casa editrice
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['casaEditrice']
    },
    
    31: {# Quali sono i generi di un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
        """,
        'required_params': ['animeTitle']
    }
}