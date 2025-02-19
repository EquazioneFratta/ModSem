import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

interface ResultsTableProps {
  results: Array<Record<string, string>>;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  //Se la query non produce risultati, mostra un messaggio
  if (!results || results.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Nessun risultato trovato
        </Typography>
      </Box>
    );
  }
  // Estrai le chiavi della prima riga per creare le colonne
  const columns = Object.keys(results[0]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table key={"tableResults"}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: (theme) => theme.palette.grey[50]
                }}
              >
                {capitalize(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow
              key={index}
              hover
            >
              {columns.map((column) => (
                <TableCell key={`${index}-${column}`}>
                  {row[column]}
                </TableCell>
              ))}
              {row[0]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;