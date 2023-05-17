/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function SimpleAccordion() {
  const token =
    "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";

  const [user, setUser] = useState<any>([]);
  const [erro, setErro] = useState<any>();
  const [detail, setDetail] = useState<any>([]);
  const [search, setSearch] = useState({
    input: "",
    data: [],
  });

  const getData = (url: string, setState: any) => {
    axios
      .get(url, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        setState(response);
      })
      .catch((error) => {
        setErro(error);
      });
  };

  useEffect(() => {
    getData("https://api.github.com/users", setUser);
  }, []);

  const onHandleSearch = () => {
    const filteredUser = user?.data?.filter((item: any) =>
      item.login.toLowerCase().includes(search.input.toLowerCase())
    );
    setSearch({ ...search, data: filteredUser });
  };

  return (
    <Box maxWidth="sm" mx={"auto"}>
      <TextField
        fullWidth
        hiddenLabel
        sx={{ background: "white", marginBottom: 1 }}
        id="filled-hidden-label-small"
        placeholder="Enter username"
        variant="filled"
        size="small"
        onChange={(e) => setSearch({ ...search, input: e.target.value })}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ marginBottom: 1 }}
        onClick={onHandleSearch}
      >
        Search
      </Button>
      {erro?.response?.status == 401
        ? erro?.message
        : search?.data?.length === 0
        ? user?.data?.map((item: any, idx: number) => {
            return (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => getData(item.repos_url, setDetail)}
                >
                  <Typography>{item.login}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {detail?.data?.map((item: any, idx: number) => {
                      return (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                          key={idx}
                          sx={{
                            border: "1px solid gray",
                            marginBottom: "8px",
                            padding: "8px",
                            background: "gray",
                            borderRadius: "8px",
                          }}
                        >
                          <Box sx={{ textAlign: "left" }}>
                            <Box sx={{ fontWeight: 600 }}>{item.name}</Box>
                            <Box sx={{ fontSize: 12 }}>{item.description}</Box>
                          </Box>
                          <Box sx={{ width: "30px", fontWeight: 600 }}>
                            {item.forks_count} *
                          </Box>
                        </Stack>
                      );
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        : search?.data?.map((item: any, idx: number) => {
            return (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => getData(item.repos_url)}
                >
                  <Typography>{item.login}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {detail?.data?.map((item: any, idx: number) => {
                      return (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                          key={idx}
                          sx={{
                            border: "1px solid gray",
                            marginBottom: "8px",
                            padding: "8px",
                            background: "gray",
                            borderRadius: "8px",
                          }}
                        >
                          <Box sx={{ textAlign: "left" }}>
                            <Box sx={{ fontWeight: 600 }}>{item.name}</Box>
                            <Box sx={{ fontSize: 12 }}>{item.description}</Box>
                          </Box>
                          <Box sx={{ width: "30px", fontWeight: 600 }}>
                            {item.forks_count} *
                          </Box>
                        </Stack>
                      );
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
    </Box>
  );
}
