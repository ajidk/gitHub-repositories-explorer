import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function SimpleAccordion() {
  const token = "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";

  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        console.log(response);

        setUser(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

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
      {user?.data?.map((item: any, idx: number) => {
        return (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.login}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. */}
                {item.repos_url}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {/* <Accordion>
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
      </Accordion> */}
    </Box>
  );
}
