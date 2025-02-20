export interface Query {
  id: number; //ID univoco per identificare la query nel backend
  label: string; //"nome" della query che verrá mostrato all'utente
  paramLabel: string[]; // array contenente i parametri necessari all'esecuzione della query 
  paramValue: string[]; 
}