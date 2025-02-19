import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";
import JMQuery from "./QueryTabs/JMQuery";
import PublicEndPoint from "./QueryTabs/PublicEndPoint";

import { Query } from "./QueryInterface";

const Home: React.FC = () => {

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
      paramLabel: ["serializzazione"],
      paramValue: ["", ""]
    },
    {
      id: 3,
      label: "Anime ha target shonen",
      paramLabel: ["Titolo Anime"],
      paramValue: ["animeTitle"]
    },
    {
      id: 4,
      label: "Chi è l'autore del manga",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"]
    },
    {
      id: 5,
      label: "Quali archi contiene il manga",
      paramLabel: ["manga"],
      paramValue: ["", ""]
    },
    {
      id: 6,
      label: "Qual è il manga shonen con meno archi narrativi",
      paramLabel: [""],
      paramValue: ["", ""]
    },
    {
      id: 7,
      label: "",
      paramLabel: [""],
      paramValue: ["", ""]
    },
    {
      id: 8,
      label: "",
      paramLabel: [""],
      paramValue: ["", ""]
    },
    {
      id: 9,
      label: "",
      paramLabel: [""],
      paramValue: ["", ""]
    },
    {
      id: 10,
      label: "",
      paramLabel: [""],
      paramValue: ["", ""]
    }
  ];


  const [renderedItem, setRenderedItem] = useState(localStorage.getItem('render'));

  function handleSetRenderedItem(value: string) {
    localStorage.setItem("render", value);
    setRenderedItem(localStorage.getItem('render'));
  }

  localStorage.setItem("render", "gui");
  const renderContent = () => {
    switch (renderedItem) {
      case "anime":
        return <JMQuery queryList={queryList} sectionLabel="Query sugli Anime" />;
      case "manga":
        return <JMQuery queryList={queryList} sectionLabel="Query sui Manga" />;
      case "persone":
        return <JMQuery queryList={queryList} sectionLabel="Query sulle persone" />;
      case "publicEndPoint":
        return <PublicEndPoint queryList={queryList} />
      default:
        return (
          <Box>
            <Typography variant="h3">
              titolo
            </Typography>
            
            <Typography variant="h5" sx={{mt:"5vh"}}>
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

        <Box sx={{ display: "flex", gap: 2, mt: "12vh" }}>
          {renderContent()}
        </Box>
      </Box>
    </Container >
  );
}

export default Home;


// useEffect(() => {
//   handleStorageChange();
//   window.addEventListener('storage', handleStorageChange);
//   return () => { window.removeEventListener('storage', handleStorageChange) };
// }, []);
