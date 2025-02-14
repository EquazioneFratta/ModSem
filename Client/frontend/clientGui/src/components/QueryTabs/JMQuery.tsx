import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  Autocomplete,
  CircularProgress
} from "@mui/material";
import { Query } from "../QueryInterface"
import ResultsTable from "../ResultsTable"

const BACKEND_URL = "http://127.0.0.1:8000/";

interface JMQueryProps {
  queryList: Query[];
  sectionLabel: string;
}

function JMQuery({ queryList, sectionLabel }: JMQueryProps) {
  const [selectedQuery, setSelectedQuery] = useState<Query>(); //Query che si vuole eseuguire scelta da un insieme predefinito
  const [paramValues, setParamValues] = useState<string[]>([]); // Valori dei parametri della query, array di stringhe

  const [results, setResults] = useState(); //Risultato della query, array di oggetti [{},{}]

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


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
    //TODO: in caso poi si dovesse riaggiungere paramValue, sosituire sutte i paramLabel qui sotto
    if (selectedQuery) {
      // Trasforma l'array in un oggetto vuoto chiave-valore di tipo `Record<string, string>` 
      // (ossia un oggetto in cui ogni chiave è una stringa e ogni valore è una stringa)
      //acc: oggetto che conterrá i parametri finali, paramLabel: nome del parametro corrente, i: indice dell'elemento nell'array
      const parameterMap = selectedQuery.paramValue.reduce((acc, paramValue, i) => {
        // Associa a ciascun parametro il valore corrispondente nell'array `paramValues`
        acc[paramValue] = paramValues[i];
        return acc;
      }, {} as Record<string, string>); // Definisce il tipo dell'oggetto vuoto iniziale

      const jsonData = {
        id: selectedQuery.id,
        parameters: parameterMap,
      };
      console.log(jsonData)
      
      try {
        const response = await fetch(
          BACKEND_URL + "sparql/",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },

            body: JSON.stringify(jsonData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false)
          setError(false);
          setErrorMessage("");
          setResults(data.results);
        } else {
          const data = await response.json();
          setError(true);
          setErrorMessage(data.error);
          setIsLoading(false)
        }
      } catch (error: any) {
        setIsLoading(false)
        setError(true);
        setErrorMessage("Server al momento non raggiungibile");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 3
        }}
      >
        <Typography variant="h4" align="center">
          {sectionLabel}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <Autocomplete
              disablePortal
              id="queryAutocomplete"
              options={queryList}
              value={selectedQuery || null}
              onChange={handleQueryChange}
              // getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderInput={(params) => (
                <TextField {...params} label="Query" />
              )}
            />
          </FormControl>

          {selectedQuery && selectedQuery.paramLabel.map((label, index) => (
            <TextField
              key={`${selectedQuery.label}-${selectedQuery.paramLabel[index]}`}
              sx={{ flex: 1 }}
              label={label}
              value={paramValues[index] || ""}
              onChange={(e) => handleParamChange(index, e.target.value)}
            />
          ))}

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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {results && (
            <ResultsTable results={results} />
          )}
        </Box>

        {error && (
          <Typography color="error">
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default JMQuery;