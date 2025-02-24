import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Query } from "./QueryInterface";
import JMQuery from "./QueryTabs/JMQuery";
import PublicEndPoint from "./QueryTabs/PublicEndPoint";

const Home: React.FC = () => {
  //Elenco delle query
  const animeQueryList: Query[] = [
    {
      id: 1,
      label: "Quale studio ha animato",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 2,
      label: "Qual'è il target di",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 3,
      label: "Quali anime hanno target",
      paramLabel: ["Target"],
      paramValue: ["target"]
    },
    {
      id: 4,
      label: "Quali anime ha prodotto lo studio",
      paramLabel: ["Studio d'animazione"],
      paramValue: ["studio"]
    },
    {
      id: 5,
      label: "Chi ha diretto l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 6,
      label: "Chi ha doppiato l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 7,
      label: "Quali anime hanno partecipato all' award", //stampa partecipanti e vincitore
      paramLabel: ["award"],
      paramValue: ["award"]
    },
    {
      id: 8,
      label: "Quali anime sono stagionali",
      paramLabel: [""],
      paramValue: [""]
    },
    {
      id: 9,
      label: "È in produzione l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 10,
      label: "Quanti episodi ha l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
  ]

  const mangaQueryList: Query[] = [
    {
      id: 11,
      label: "Chi è l'autore di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 12,
      label: "Quanti volumi ha", 
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 13,
      label: "Chi detiene i diritti di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 14,
      label: "Quali manga sono sotto licenza di",
      paramLabel: ["Casa editrice"],
      paramValue: ["casaEditrice"]
    },
    {
      id: 15,
      label: "Su quale rivista è pubblicato ",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 16,
      label: "Quali manga ha pubblicato la rivista",
      paramLabel: ["Rivista"],
      paramValue: ["rivista"]
    },
    {
      id: 17,
      label: "Quali manga sono in produzione",
      paramLabel: [""],
      paramValue: [""]
    },
    {
      id: 18,
      label: "Qual è il target di",
      paramLabel: ["Ttitolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 19, 
      label: "Quali archi narrativi ha il manga", // tre colonne, la seconda da "true" sul primo arco narrativo, la terza "true" sull'utlimo 
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 20, 
      label: "Esiste un adattamento anime di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 21,
      label: "Quali manga hanno anche un adattamento anime", 
      paramLabel: [""],
      paramValue: [""]
    },
  ]

  const personQueryList: Query[] = [
    {
      id: 22,
      label: "Chi sono i colleghi di",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
    {
      id: 23,
      label: "Di quale studio d'animazione è dipendente",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
    {
      id: 24,
      label: "Chi sono i dipendenti di",
      paramLabel: ["Studio d'animazione"],
      paramValue: ["studio"]
    },
    {
      id: 25,
      label: "Cosa ha diretto",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
    {
      id: 26,
      label: "Cosa ha doppiato",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
    {
      id: 27,
      label: "Con chi ha lavorato",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
    {
      id: 28,
      label: "Cosa ha scritto",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"]
    },
  ]

  const publicEndPointQuery: Query[] = [
    {
      id: 29,
      label: "Chi sono i doppiatori in",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 30,
      label: "Quali comics pubblica ",
      paramLabel: ["Casa editrice"],
      paramValue: ["casaEditrice"]
    },
    {
      id: 31,
      label: "Quali sono i generi di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
  ]
  // Tiene tracca e aggionra il contenuto della pagina in base alla sezione desiderata dall'utente
  const [renderedItem, setRenderedItem] = useState(localStorage.getItem('render'));

  function handleSetRenderedItem(value: string) {
    localStorage.setItem("render", value);
    setRenderedItem(localStorage.getItem('render'));
  }

  localStorage.setItem("render", "gui");

  const renderContent = () => {
    switch (renderedItem) {
      case "anime":
        return <JMQuery queryList={animeQueryList} sectionLabel="Query sugli Anime" />;
      case "manga":
        return <JMQuery queryList={mangaQueryList} sectionLabel="Query sui Manga" />;
      case "persone":
        return <JMQuery queryList={personQueryList} sectionLabel="Query sulle persone" />;
      case "publicEndPoint":
        return <PublicEndPoint queryList={publicEndPointQuery} />
      default:
        return (
          <Box>
            <Typography variant="h3">
              titolo
            </Typography>

            <Typography variant="h5" sx={{ mt: "5vh" }}>
              Query sugli Anime
            </Typography>
            <ul>
              <li></li>
              <li></li>
            </ul>

            <Typography variant="h5">
              Query sui Manga
            </Typography>
            <ul>
              <li></li>
              <li></li>
            </ul>

            <Typography variant="h5">
              Query sulle persone
            </Typography>
            <ul>
              <li></li>
              <li></li>
            </ul>

            <Typography variant="h5">
              Query su EndPoint pubblico
            </Typography>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </Box>
        )
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
        {/* Header contenente i pulsanti che portano alle varie sezioni del sito */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "8vh",
            backgroundColor: "#3B82F6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
          }}>
          <Box sx={{ m: 4 }}>
            <Button
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                color: 'white',
              }}
              onClick={() => {
                handleSetRenderedItem("home")
              }}
            >
              Japanese Media Ontology
            </Button>
          </Box>
          <Box sx={{ display: 'flex', marginRight: "10px" }}>
            <Button
              key="anime"
              sx={{
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                fontSize: '16px',
                textDecoration: renderedItem === "anime" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("anime");
              }}
            >
              <span style={{ marginRight: '1vh' }}></span>
              Query sugli Anime
            </Button>

            <Button
              key="manga"
              sx={{
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                fontSize: '16px',
                textDecoration: renderedItem === "manga" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("manga");
              }}
            >
              <span style={{ marginRight: '1vh' }}></span>
              Query sui manga
            </Button>

            <Button
              key="persone"
              sx={{
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                fontSize: '16px',
                textDecoration: renderedItem === "persone" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("persone");
              }}
            >
              <span style={{ marginRight: '1vh' }}></span>
              Query sulle persone
            </Button>

            <Button
              key="publicEndPoint"
              sx={{
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                fontSize: '16px',
                textDecoration: renderedItem === "publicEndPoint" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("publicEndPoint");
              }}
            >
              <span style={{ marginRight: '1vh' }}></span>
              EndPoint pubblico
            </Button>
          </Box>
        </Box>

        {/* Cotntenuto della sezione scelta */}
        <Box sx={{ display: "flex", gap: 2, mt: "12vh" }}>
          {renderContent()}
        </Box>
      </Box>
    </Container >
  );
}

export default Home;