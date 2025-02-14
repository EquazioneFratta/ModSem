export interface Query {
  id: number; //ID univoco per identificare la query
  label: string; //"nome" della query che verrá mostrato all'utente
  paramLabel: string[]; // array contenente i parametri necessari all'esecuzione della query 
  paramValue: string[]; 
}


// query su persone
// query su anime
// query su manga