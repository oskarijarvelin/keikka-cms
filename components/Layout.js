import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from '@mui/material/Stack';

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: '95vw',
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  mx: 'auto',
  maxHeight: '98vh',
  overflow: 'auto'
};

export default function Layout({ title, description, asiakas, children }) {
  var api_url = "";
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [consent, setConsent] = React.useState(false);
  const [keikanStatus, setKeikanStatus] = React.useState(0);
  const [startDate, setStartDate] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(false);
  const [reloading, setReloading] = React.useState(false);

  const changeConsent = () => {
    setConsent(!consent);
  };

  const changeKeikanStatus = (event) => {
    setKeikanStatus(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReload = () => {
    setReloading(true);
    router.reload(window.location.pathname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lomake = {
      asiakasnumero: e.target.asiakasnumero.value,
      title: e.target.title.value,
      venue: e.target.venue.value,
      startdate: startDate,
      duedate: dueDate,
      description: e.target.description.value,
      keikanstatus: e.target.keikanstatus.value,
    };

    if (process.env.NODE_ENV === "development") {
      api_url = `/api/new_gig`;
    } else {
      api_url = `https://keikat.oskarijarvelin.fi/api/new_gig`;
    }

    const response = await fetch(`${api_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lomake),
    });

    console.log(response);

    setOpen(false);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" component="header">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 700, fontSize: {xs: 16, sm: 18, md: 20, xl: 24} }}
              >
                {title}
              </Typography>
            </Box>
            <Tooltip title="Päivitä tehtävät">
              <IconButton onClick={() => handleReload()} color="white">
                <AutorenewIcon
                  sx={{
                    animation: reloading ? "spin 2s linear infinite" : "none",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(0deg)",
                      },
                      "100%": {
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="main"
        sx={{ pt: "64px", minHeight: "calc(100vh - 85px)" }}
      >
        {children}
        {(asiakas == 1) && (
          <Tooltip title="Lähetä uusi tehtävä">
            <Fab
              color="primary"
              aria-label="add"
              sx={{ position: "fixed", right: 36, bottom: 36 }}
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>
      <Box component="footer">
        <Typography
          sx={{ py: 4, fontSize: 14, textAlign: "center", color: "#AAA" }}
        >
          &copy; {new Date().getFullYear()} {"Oskari Järvelin"}
        </Typography>
      </Box>

      {asiakas && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          keepMounted
        >
          <Box sx={{ ...style }}>
            <Typography
              variant="h4"
              id="modal-title"
              sx={{ my: 2, fontWeight: 500 }}
            >
              Lisää uusi keikka
            </Typography>

            <Typography id="modal-description" sx={{ mb: 3 }}>
                Varmistathan joko minulta tai <Link href="https://oskarijarvelin.fi/kalenteri" target="_blank" rel="noopener">
                keikkakalenteristani</Link> vapaat päivät ennen uuden keikan tilaamista.
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 3, display: "none" }}>
                <TextField
                  required
                  id="asiakasnumero"
                  label="Asiakasnumero"
                  name="asiakasnumero"
                  defaultValue={asiakas}
                  disabled={true}
                  hidden
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  id="nimi"
                  label="Keikan nimi"
                  name="title"
                  defaultValue=""
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                  id="venue"
                  label="Venue"
                  name="venue"
                  defaultValue=""
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Aloituspäivämäärä"
                    id="startdate"
                    name="startdate"
                    format="D.M.YYYY"
                    ampm={false}
                    onChange={(e) => setStartDate(Number(e))}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Lopetuspäivämäärä (jos eri)"
                    id="duedate"
                    name="duedate"
                    format="D.M.YYYY"
                    ampm={false}
                    onChange={(e) => setDueDate(Number(e))}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  id="description"
                  label="Keikan lisätiedot"
                  name="description"
                  defaultValue=""
                  multiline={true}
                  minRows={4}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="status-label">Keikka on</InputLabel>

                <Select
                  labelId="status-label"
                  id="keikanstatus"
                  value={keikanStatus}
                  label="Keikka on"
                  name="keikanstatus"
                  onChange={changeKeikanStatus}
                >
                  <MenuItem value={0}>
                    <b>Alustava</b>&nbsp;&nbsp;&nbsp;
                    <small>(vahvistan keikan vielä myöhemmin)</small>
                  </MenuItem>
                  <MenuItem value={1}>
                    <b>Varma</b>&nbsp;&nbsp;&nbsp;
                    <small>(keikan peruminen saattaa maksaa)</small>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <small>
                        <span>Olen tutustunut </span>
                        <Link
                          href="https://oskarijarvelin.fi/hinnoittelu"
                          target="_blank"
                          rel="noopener"
                        >
                          hinnastoon
                        </Link>
                        <span> sekä </span>
                        <Link
                          href="https://oskarijarvelin.fi/sopimusehdot"
                          target="_blank"
                          rel="noopener"
                        >
                          yleisiin sopimusehtoihin
                        </Link>
                        <span>
                          {" "}
                          ja ymmärrän keikan tulevan täysimääräisenä veloitettavaksi, jos perun varman keikan alle 14 vuorokautta ennen sen alkamista.
                        </span>
                      </small>
                    }
                    sx={{
                      "& a": { color: "#223388" },
                      "& .MuiFormControlLabel-label": { lineHeight: "1.1" },
                    }}
                    checked={consent}
                    onChange={changeConsent}
                  />
                </FormGroup>
              </FormControl>

              <Stack spacing={2} direction="row" justifyContent="space-between">
                <Button variant="contained" type="submit" disabled={!consent}>
                  Lähetä
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Sulje
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
