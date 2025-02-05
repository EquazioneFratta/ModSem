import { useState } from "react";
import { Button, Input, Card, CardContent } from "@/components/ui";

export default function SparqlClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const executeQuery = async () => {
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/sparql/?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Errore nell'esecuzione della query");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">SPARQL Client</h1>
      <Input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Scrivi una query SPARQL..."
        className="mb-4"
      />
      <Button onClick={executeQuery}>Esegui Query</Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {results && (
        <Card className="mt-4">
          <CardContent>
            <pre className="whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
