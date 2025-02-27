import { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { Query } from "./QueryInterface";
import nika from "../assets/nika.png"
import JMQuery from "./QueryTabs/JMQuery";
import PublicEndPoint from "./QueryTabs/PublicEndPoint";

const Home: React.FC = () => {
  //Elenco delle query
  const animeQueryList: Query[] = [
    {
      id: 1,
      label: "Quale studio ha animato",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 2,
      label: "Qual'è il target di",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 3,
      label: "Quali anime hanno target",
      paramLabel: ["Target"],
      paramValue: ["target"],
    },
    {
      id: 4,
      label: "Quali anime ha prodotto lo studio",
      paramLabel: ["Studio d'animazione"],
      paramValue: ["studio"],
    },
    {
      id: 5,
      label: "Chi ha diretto l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 6,
      label: "Chi ha doppiato l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 7,
      label: "Quali anime hanno partecipato all' award", //stampa partecipanti e vincitore
      paramLabel: ["award"],
      paramValue: ["award"],
    },
    {
      id: 8,
      label: "Quali anime sono stagionali",
      paramLabel: [""],
      paramValue: [""],
    },
    {
      id: 9,
      label: "È in produzione l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 10,
      label: "Quanti episodi ha l'anime",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
  ];

  const mangaQueryList: Query[] = [
    {
      id: 11,
      label: "Chi è l'autore di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 12,
      label: "Quanti volumi ha",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 13,
      label: "Chi detiene i diritti di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 14,
      label: "Quali manga sono sotto licenza di",
      paramLabel: ["Casa editrice"],
      paramValue: ["casaEditrice"],
    },
    {
      id: 15,
      label: "Su quale rivista è pubblicato ",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 16,
      label: "Quali manga ha pubblicato la rivista",
      paramLabel: ["Rivista"],
      paramValue: ["rivista"],
    },
    {
      id: 17,
      label: "Quali manga sono in produzione",
      paramLabel: [""],
      paramValue: [""],
    },
    {
      id: 18,
      label: "Qual è il target di",
      paramLabel: ["Ttitolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 19,
      label: "Quali archi narrativi ha il manga", // TODO: tre colonne, la seconda da "true" sul primo arco narrativo, la terza "true" sull'utlimo
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
    {
      id: 20,
      label: "Esiste un adattamento anime di",
      paramLabel: ["Titolo manga"],
      paramValue: ["mangaTitle"],
    },
  ];

  const personQueryList: Query[] = [
    {
      id: 21,
      label: "Chi sono i colleghi di",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
    {
      id: 22,
      label: "Di quale studio d'animazione è dipendente",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
    {
      id: 23,
      label: "Chi sono i dipendenti di",
      paramLabel: ["Studio d'animazione"],
      paramValue: ["studio"],
    },
    {
      id: 24,
      label: "Cosa ha diretto",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
    {
      id: 25,
      label: "Cosa ha doppiato",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
    {
      id: 26,
      label: "Con chi ha lavorato",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
    {
      id: 27,
      label: "Cosa ha scritto",
      paramLabel: ["Nome persona"],
      paramValue: ["persona"],
    },
  ];

  const publicEndPointQuery: Query[] = [
    {
      id: 28,
      label: "Chi sono i doppiatori in",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
    {
      id: 29,
      label: "Quali comics pubblica ",
      paramLabel: ["Casa editrice"],
      paramValue: ["casaEditrice"],
    },
    {
      id: 30,
      label: "Quali sono i generi di",
      paramLabel: ["Titolo anime"],
      paramValue: ["animeTitle"],
    },
  ];
  // Tiene tracca e aggionra il contenuto della pagina in base alla sezione desiderata dall'utente
  const [renderedItem, setRenderedItem] = useState(
    localStorage.getItem("render")
  );

  function handleSetRenderedItem(value: string) {
    localStorage.setItem("render", value);
    setRenderedItem(localStorage.getItem("render"));
  }

  localStorage.setItem("render", "gui");

  const renderContent = () => {
    switch (renderedItem) {
      case "anime":
        return (
          <JMQuery
            queryList={animeQueryList}
            sectionLabel="Query sugli Anime"
          />
        );
      case "manga":
        return (
          <JMQuery queryList={mangaQueryList} sectionLabel="Query sui Manga" />
        );
      case "persone":
        return (
          <JMQuery
            queryList={personQueryList}
            sectionLabel="Query sulle persone"
          />
        );
      case "publicEndPoint":
        return <PublicEndPoint queryList={publicEndPointQuery} />;
      default:
        return (
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{
              width: "100%",
              overflow: "hidden",
            }}
          >
            {/* Box query list */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{
                width: "60%",
              }}
            >
              {/* anmime/manga */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10vw",
                  mt: "5vh",
                }}
              >
                <Box width={"30%"}>
                  <Typography variant="h5" color={"#3B82F6"}>
                    Query sugli Anime
                  </Typography>
                  <ul>
                    <li>Quale studio ha animato</li>
                    <li>Qual'è il target di</li>
                    <li>Quali anime hanno target</li>
                    <li>Quali anime ha prodotto lo studio</li>
                    <li>Chi ha diretto l'anime</li>
                    <li>Chi ha doppiato l'anime</li>
                    <li>Quali anime hanno partecipato all' award</li>
                    <li>Quali anime sono stagionali</li>
                    <li>È in produzione l'anime</li>
                    <li>Quanti episodi ha l'anime</li>
                  </ul>
                </Box>

                <Box width={"30%"}>
                  <Typography variant="h5" color={"#3B82F6"}>
                    Query sui Manga
                  </Typography>
                  <ul>
                    <li>Chi è l'autore di</li>
                    <li>Quanti volumi ha</li>
                    <li>Chi detiene i diritti di</li>
                    <li>Quali manga sono sotto licenza di</li>
                    <li>Su quale rivista è pubblicato </li>
                    <li>Quali manga ha pubblicato la rivista</li>
                    <li>Quali manga sono in produzione</li>
                    <li>Qual è il target di</li>
                    <li>Quali archi narrativi ha il manga"</li>
                    <li>Esiste un adattamento anime di</li>
                  </ul>
                </Box>
              </Box>

              {/* persone/endpoint pubblico */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10vw",
                  mt: "5vh",
                }}
              >
                <Box width={"30%"}>
                  <Typography variant="h5" color={"#3B82F6"}>
                    Query sulle persone
                  </Typography>
                  <ul>
                    <li>Chi sono i colleghi di</li>
                    <li>Di quale studio d'animazione è dipendente</li>
                    <li>Chi sono i dipendenti di</li>
                    <li>Cosa ha diretto</li>
                    <li>Cosa ha doppiato</li>
                    <li>Con chi ha lavorato</li>
                    <li>Cosa ha scritto</li>
                  </ul>
                </Box>

                <Box width={"30%"}>
                  <Typography variant="h5" color={"#3B82F6"}>
                    Query su EndPoint pubblico
                  </Typography>
                  <ul>
                    <li>Chi sono i doppiatori in</li>
                    <li>Quali comics pubblica </li>
                    <li>Quali sono i generi di</li>
                  </ul>
                </Box>
              </Box>
            </Box>

            {/* Box immagine */}
            <Box
              sx={{
                width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                // src={nika}
                src="dio"
                alt="Immagine"
                style={{
                  width: "35%",
                  height: "auto",
                  scale: "4",
                }}
              />
            </Box>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, margin: "0" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 3,
          ml: "10em",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Box sx={{ m: 4 }}>
            <Button
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "none",
                color: "#3B82F6",
              }}
              onClick={() => {
                handleSetRenderedItem("home");
              }}
            >
              Japanese Media Ontology
            </Button>
          </Box>
          <Box sx={{ display: "flex", marginRight: "10px" }}>
            <Button
              key="anime"
              sx={{
                borderColor: "black",
                color: "black",
                textTransform: "none",
                fontSize: "16px",
                textDecoration: renderedItem === "anime" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("anime");
              }}
            >
              <span style={{ marginRight: "1vh" }}></span>
              Query sugli Anime
            </Button>

            <Button
              key="manga"
              sx={{
                borderColor: "black",
                color: "black",
                textTransform: "none",
                fontSize: "16px",
                textDecoration: renderedItem === "manga" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("manga");
              }}
            >
              <span style={{ marginRight: "1vh" }}></span>
              Query sui manga
            </Button>

            <Button
              key="persone"
              sx={{
                borderColor: "black",
                color: "black",
                textTransform: "none",
                fontSize: "16px",
                textDecoration:
                  renderedItem === "persone" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("persone");
              }}
            >
              <span style={{ marginRight: "1vh" }}></span>
              Query sulle persone
            </Button>

            <Button
              key="publicEndPoint"
              sx={{
                borderColor: "black",
                color: "black",
                textTransform: "none",
                fontSize: "16px",
                textDecoration:
                  renderedItem === "publicEndPoint" ? "underline" : "none",
              }}
              onClick={() => {
                handleSetRenderedItem("publicEndPoint");
              }}
            >
              <span style={{ marginRight: "1vh" }}></span>
              EndPoint pubblico
            </Button>
          </Box>
        </Box>

        {/* Linea blu sopra il content */}
        <Box
          sx={{
            position: "fixed",
            top: "8vh",
            left: 0,
            width: "100vw",
            height: "2px",
            backgroundColor: "#3B82F6",
          }}
        />

        {/* Cotntenuto della sezione scelta */}
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            gap: 2,
            mt: "12vh",
            width: "80%", 
          }}
        >
          {renderContent()}
        </Box>
      </Box>
      {/* footer, boh non so  */}
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "5vh",
          backgroundColor: "#80888F",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      /> */}
    </Container>
  );
};

export default Home;
