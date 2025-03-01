import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Query } from "../QueryInterface";
import ResultsTable from "../ResultsTable";

// URL per effettuare le richieste al backend
const BACKEND_URL = "http://127.0.0.1:8000/";

interface JMQueryProps {
  queryList: Query[];
  sectionLabel: string;
}

function JMQuery({ queryList, sectionLabel }: JMQueryProps) {
  const [selectedQuery, setSelectedQuery] = useState<Query>(); //Indica la query che si vuole eseuguire scelta da un insieme predefinito
  const [paramValues, setParamValues] = useState<string[]>([]); //Valori dei parametri della query, array di stringhe
  
  const [results, setResults] = useState(); //Risultato della query, array di oggetti [{},{}]

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Funzioni che tengono traccia del cambiamento dei campi query e parametri
  const handleQueryChange = (_event: any, newQuery: Query | null) => {
    setSelectedQuery(newQuery || undefined);
    if (newQuery) {
      setParamValues(new Array(newQuery.paramLabel.length).fill(""));
    } else {
      setParamValues([]);
    }
  };

  const handleParamChange = (index: number, value: string) => {
    const newParamValues = [...paramValues];
    newParamValues[index] = value;
    setParamValues(newParamValues);
  };

  async function executeQuery(): Promise<void> {
    setIsLoading(true);
    setError(false);
    setErrorMessage("");
    if (selectedQuery) {
      // Trasforma l'array in un oggetto vuoto di tipo `Record<string, string>`
      // oggetto dizionario in cui ogni chiave è una stringa e ogni valore è una stringa
      //queryParameters: oggetto che conterrá i parametri finali, paramLabel: nome del parametro corrente, i: indice dell'elemento nell'array
      const parameterMap = selectedQuery.paramValue.reduce(
        (queryParameters, paramValue, i) => {
          queryParameters[paramValue] = paramValues[i]; //Associa a ciascun parametro il valore corrispondente nell'array `paramValues`
          return queryParameters;
        },
        {} as Record<string, string>
      ); //Definisce il tipo dell'oggetto vuoto iniziale

      const jsonData = {
        id: selectedQuery.id,
        parameters: parameterMap,
      };

      try {
        // Effettua la richiesta al backend
        const response = await fetch(BACKEND_URL + "sparql/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },

          body: JSON.stringify(jsonData),
        });
        // Handling risposta del backend
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setError(false);
          setErrorMessage("");
          setResults(data.results);
        } else {
          const data = await response.json();
          setError(true);
          setErrorMessage(data.error);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(true);
        setErrorMessage("Server al momento non raggiungibile");
      }
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        gap: 3,
        marginLeft: "10%", 
      }}
    >
      <Typography variant="h4" align="center">
        {sectionLabel}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Gestisce la selezione della query */}
        <FormControl sx={{ flex: 1, minWidth: "50%" }}>
          <Autocomplete
            disablePortal
            id="queryAutocomplete"
            options={queryList}
            value={selectedQuery || null}
            onChange={handleQueryChange}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField {...params} label="Query" key={"queryTextField"} />
            )}
          />
        </FormControl>

        {/* Gestisce la selezione dei parametri sulla base della query scelta */}
        <TextField
          key={"paramInputField"}
          sx={{
            flex: 1,
            backgroundColor:
              selectedQuery?.paramLabel[1] === "" ? "#f2f2f2" : "transparent",
          }}
          disabled={selectedQuery?.paramLabel[1] === ""}
          label={selectedQuery ? selectedQuery.paramLabel[0] : ""}
          value={paramValues[0] || ""}
          onChange={(e) => handleParamChange(0, e.target.value)}
        />

        {/* Pulsante per eseguire la query */}
        <Button
          variant="contained"
          onClick={executeQuery}
          disabled={!selectedQuery}
          sx={{
            height: "56px",
            whiteSpace: "nowrap",
            px: 4,
          }}
        >
          Esegui Query
        </Button>
      </Box>

      <Box>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Se la query ha prodotto dei risultati li mostra */}
        {results && <ResultsTable results={results} />}
      </Box>

      {/* Se il backend o il frontend incontrano un errore viene mostrato   */}
      {error && <Typography color="error">{errorMessage}</Typography>}
    </Box>
  );
}

export default JMQuery;
