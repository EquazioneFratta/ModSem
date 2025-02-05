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
import { Query } from "./QueryInterface"
import ResultsTable from "./ResultsTable"

const BACKEND_URL = "http://127.0.0.1:8000/";

function SparqlClient() {
  const [selectedQuery, setSelectedQuery] = useState<Query>();
  const [paramValues, setParamValues] = useState<string[]>([]);

  const [results, setResults] = useState(null);

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryList: Query[] = [
    {
      id: 1,
      label: "Persone",
      paramLabel: ["studio", "animatore"],
      paramValue: ["studio_param", "animatore_param"]  // Valori univoci per identificare i parametri
    },
    {
      id: 2,
      label: "Libri",
      paramLabel: ["nomeSerie", "serializzazione"],
      paramValue: ["serie_param", "serializzazione_param"]  // Valori univoci per identificare i parametri
    }
  ];

  const handleQueryChange = (_event: any, newQuery: Query | null) => {
    setSelectedQuery(newQuery || undefined);
    if (newQuery) {
      setParamValues(new Array(newQuery.paramValue.length).fill(""));
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
      const parameterMap = selectedQuery.paramValue.reduce((acc, paramValue, index) => {
        acc[paramValue] = paramValues[index];
        return acc;
      }, {} as Record<string, string>);

      const jsonData = {
        id: selectedQuery.id,
        parameters: parameterMap,
      };
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
          setSuccess(true);
          setResults(data.results);
          console.log(results)
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
      console.log("Query selezionata:", selectedQuery.label);
      console.log("Parametri:", parameterMap);
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
          Sparql Client
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
              key={`${selectedQuery.label}-${selectedQuery.paramValue[index]}`}
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
          {isLoding && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {results && (
            <ResultsTable results={results} />
          )
            //  <div>
            //    {results}
            //  </div>
          }
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

export default SparqlClient;