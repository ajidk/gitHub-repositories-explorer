import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function SimpleAccordion() {
  const token = "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";

  const [user, setUser] = useState();

  axios
    .get("https://api.github.com/search/users?q=ajidk", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((response: any) => {
      // handle success
      console.log(response);
      setUser(response)
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
  return (
    <Box maxWidth="sm" mx={"auto"}>
      <TextField
        fullWidth
        sx={{ background: "white", marginBottom: 2 }}
        id="standard-basic"
        label="Enter username"
        variant="standard"
      />
      <Button fullWidth variant="contained" sx={{ marginBottom: 2 }}>
        Contained
      </Button>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
