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
                FILTER (STR(?label) = "$animeTitle")
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
                FILTER (STR(?label) = "$animeTitle")
            }        
        """,
        'required_params': ['animeTitle']
    },
    
    3: {# Quali anime hanno un dato target
        'query': """
           PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?labela
            WHERE { 
    			?target jm:èTargetDi ?anime .
   				?target rdfs:label ?labelt .
                ?anime rdfs:label ?labela .
                FILTER (STR(?labelt) = "$target")
            }
        """,
        'required_params': ['target']
    },
    
    4: {# Quali anime ha prodotto un dato studio d'animazione
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?labela
            WHERE { 
                ?anime rdfs:label ?labela .
                ?studio jm:haProdotto ?anime .
                ?studio rdfs:label ?labels .
                FILTER (STR(?labels) = "$studio")
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
                FILTER (STR(?label) = "$animeTitle")
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
                FILTER (STR(?label) = "$animeTitle")
            }        """,
        'required_params': ['animeTitle']
    },
    
    7: {# Quali anime hanno partecipato ad un dato award
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            PREFIX pr: <http://www.ontologydesignpatterns.org/cp/owl/participation.owl#>
            SELECT ?labela
            WHERE { 
                ?anime rdfs:label ?labela .
                ?award pr:hasParticipant ?anime ;
                    rdfs:label ?labelaw .
            FILTER (STR(?labelaw) = "$award")
            }      
        """,
        'required_params': ['award']
    },
    
    8: {# Quali anime sono stagionali TODO: gestire i required_param vuoti
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
            SELECT ?InProduzione
            WHERE {
                ?anime jm:inProduzione ?InProduzione .
                ?anime rdfs:label ?labela .
                FILTER (STR(?labela) = "$animeTitle")
            }
        """,
        'required_params': ['animeTitle']
    },
    
    10: {# Quanti episodi ha un dato anime 
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?NumeroEpisodi
            WHERE { 
                ?anime rdfs:label ?label .
                ?anime jm:numeroEpisodi ?NumeroEpisodi .
                FILTER (STR(?label) = "$animeTitle")
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
             ?manga jm:haAutore ?autore .
             ?manga rdfs:label ?labelm .
             FILTER (STR(?labelm) = "$mangaTitle")
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
                ?manga jm:numeroVolumi ?numVol .
                FILTER (STR(?label) = "$mangaTitle")
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
                ?manga jm:sottoLicenzaDi ?casaEditrice.
                FILTER (STR(?label) = "$mangaTitle")
            }
        """,
        'required_params': ['mangaTitle']
    },
    14: {# Quali manga sono sotto licenza di una data casa editrice
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?labelm
            WHERE { 
                ?casaEditrice rdfs:label ?label .
                ?manga jm:sottoLicenzaDi ?casaEditrice ;
                    rdfs:label ?labelm .
                FILTER (STR(?label) = "$casaEditrice")
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
                FILTER (STR(?label) = "$mangaTitle")
            }            
        """,
        'required_params': ['mangaTitle']
    },
    
    16: {# Quali manga ha pubblicato una data rivista
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            SELECT ?labelm
            WHERE { 
                ?rivista rdfs:label ?labelr .
                ?manga jm:pubblicatoIn ?rivista ;
                    rdfs:label ?labelm .
                FILTER (STR(?labelr) = "$rivista")
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
                FILTER (STR(?label) = "$mangaTitle")
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
                FILTER (STR(?label) = "$mangaTitle")
            }
        """,
        'required_params': ['mangaTitle']
    },
    
    20: {# Esiste un adattamento anime di un dato manga
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?labela
            WHERE { 
                ?manga rdfs:label ?label .
                ?anime jm:èAdattamentodi ?manga ;
                    rdfs:label ?labela .
                FILTER (STR(?label) = "$mangaTitle")
            }
        """,
        'required_params': ['mangaTitle']
    },
    
    #  --- Query persone --- #

    21: {# Chi sono i colleghi di una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT DISTINCT ?Collega
            WHERE { 
                ?persona rdfs:label ?label .
                ?persona jm:collegaDi ?Collega
                FILTER (STR(?label) = "$persona")
            }   
        """,
        'required_params': ['persona']
    },
    
    22: {# Di quale studio d'animazione è dipendente una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>

            SELECT ?studio
            WHERE { 
                ?persona rdfs:label ?label .
                ?persona jm:dipendenteDi ?studio
                FILTER (STR(?label) = "$persona")
            }          
        """,
        'required_params': ['persona']
    },
    
    23: {# Chi sono i dipendenti di un dato studio d'animazione
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?staff
            WHERE { 
                jm:$studio jm:haDipendente ?staff
            }   
        """,
        'required_params': ['studio']
    },
    
    24: {# Cosa ha diretto una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?anime
            WHERE { 
                ?persona rdfs:label ?label .
                ?persona jm:haDiretto ?anime
                FILTER (STR(?label) = "$persona")
            }   
        """,
        'required_params': ['persona']
    },
    
    25: {# Cosa ha doppiato una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?anime
            WHERE {             
                ?persona rdfs:label ?label .
                ?persona jm:haDoppiato ?anime
                FILTER (STR(?label) = "$persona")
            }   
        """,
        'required_params': ['persona']
    },
    
    26: {# Con chi ha lavorato una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?altraPersona
            WHERE {             
                ?persona rdfs:label ?label .
                ?persona jm:haLavoratoCon ?altraPersona
                FILTER (STR(?label) = "$persona")
            }           
        """,
        'required_params': ['persona']
    },
    
    27: {# Cosa ha scritto una data persona
        'query': """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            
            SELECT ?manga
            WHERE {             
                ?persona rdfs:label ?label .
                ?persona jm:haScritto ?manga
                FILTER (STR(?label) = "$persona")
            }        
        """,
        'required_params': ['persona']
    },
    
    #  --- Query endpoint pubblico --- #

    28: {# Chi sono i doppiatori in una dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX p: <http://www.wikidata.org/prop/>
            PREFIX ps: <http://www.wikidata.org/prop/statement/>
            PREFIX pq: <http://www.wikidata.org/prop/qualifier/>

            SELECT DISTINCT ?voiceActorName ?characterName
            WHERE {
                ?animeTitle skos:exactMatch ?wikidataURL .
                BIND(IRI(REPLACE(STR(?wikidataURL), "https://www.wikidata.org/wiki/", "http://www.wikidata.org/entity/")) AS ?wikidata) 
                
                SERVICE <https://query.wikidata.org/sparql> {
                    ?wikidata p:P725 ?statement .
                    ?statement ps:P725 ?voiceActor .

                    # Filtra solo i doppiatori giapponesi (P27 = Q17)
                    FILTER EXISTS { ?voiceActor wdt:P27 wd:Q17 }

                    OPTIONAL {
                        ?voiceActor rdfs:label ?voiceActorName .
                        FILTER(LANG(?voiceActorName) = "en")
                    }
                    
                    ?statement pq:P453 ?character .
                    
                    OPTIONAL {
                        ?character rdfs:label ?characterName .
                        FILTER(LANG(?characterName) = "en")
                    }
                }
                ?animeTitle rdfs:label ?labelt .
                FILTER (STR(?labelt) = "$animeTitle")
            }
        """,
        'required_params': ['animeTitle']
    },
    
    29: {# Quali comics pubblica una data casa editrice
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX p: <http://www.wikidata.org/prop/>
            PREFIX ps: <http://www.wikidata.org/prop/statement/>

            SELECT DISTINCT ?comicsName
            WHERE {
                jm:$casaEditrice skos:exactMatch ?wikidataURL .
                BIND(IRI(REPLACE(STR(?wikidataURL), "https://www.wikidata.org/wiki/", "http://www.wikidata.org/entity/")) AS ?wikidata) 
                
                SERVICE <https://query.wikidata.org/sparql> {
                    ?wikidata p:P1830 ?statement .
                    ?statement ps:P1830 ?ownerOf .
                    
                    OPTIONAL {
                        ?ownerOf rdfs:label ?comicsName .
                        FILTER(LANG(?comicsName) = "en")
                    }
                }
            }
        """,
        'required_params': ['casaEditrice']
    },
    
    30: {# Quali sono i generi di un dato anime
        'query': """
            PREFIX jm: <http://www.semanticweb.org/japanese-media/>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX p: <http://www.wikidata.org/prop/>
            PREFIX ps: <http://www.wikidata.org/prop/statement/>

            SELECT DISTINCT ?genreName
            WHERE {
                ?animeTitle skos:exactMatch ?wikidataURL .
                BIND(IRI(REPLACE(STR(?wikidataURL), "https://www.wikidata.org/wiki/", "http://www.wikidata.org/entity/")) AS ?wikidata) 
                
                SERVICE <https://query.wikidata.org/sparql> {
                    ?wikidata p:P136 ?statement .
                    ?statement ps:P136 ?genreOf .
                    
                    OPTIONAL {
                        ?genreOf rdfs:label ?genreName .
                        FILTER(LANG(?genreName) = "en")
                    }
                }
                ?animeTitle rdfs:label ?labelt .
                FILTER (STR(?labelt) = "$animeTitle")
            }        """,
        'required_params': ['animeTitle']
    }
}