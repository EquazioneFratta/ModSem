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
      label: "Qual'è il target di un anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 3,
      label: "Quale studio ha animato",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 2,
      label: "",
      paramLabel: [""],
      paramValue: [""]
    },
  ]

  const mangaQueryList: Query[] = [
    {
      id: 4,
      label: "Chi è l'autore del manga",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 5,
      label: "Quali archi narrativi contiene il manga",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 6,
      label: "Quali manga hanno anche un adattamento anime", //non so se va bene 
      paramLabel: [""],
      paramValue: [""]
    },
  ]

  const personQueryList: Query[] = [
    {
      id: 7,
      label: "Chi sono i doppiatori dell'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 8,
      label: "Chi ha lavorato con lo studio",
      paramLabel: ["Studio d'animazione"],
      paramValue: ["studio"]
    },
    {
      id: 9,
      label: "",
      paramLabel: [""],
      paramValue: [""]
    },
  ]

  const publicEndPointQuery: Query[] = [
    {
      id: 10,
      label: "boh",
      paramLabel: [""],
      paramValue: [""]
    },
    {
      id: 11,
      label: "boh",
      paramLabel: [""],
      paramValue: [""]
    },
    {
      id: 12,
      label: "boh",
      paramLabel: [""],
      paramValue: [""]
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