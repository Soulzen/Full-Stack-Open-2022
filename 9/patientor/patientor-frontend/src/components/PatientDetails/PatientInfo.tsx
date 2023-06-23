import React, { useState } from "react";
import { Typography, Avatar, Grid, Stack, Button } from "@mui/material";
import { Male, Female } from "@mui/icons-material";

import { Entry, EntryWithoutId } from "../../types";
import EntriesInfo from "./EntriesInfo";
import NewEntryForm from "./NewEntryForm";
import PatientsService from "../../services/patients";
import axios from "axios";

interface PatientProps {
  id: string;
  name: string;
  gender: string;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

const PatientInfo: React.FC<PatientProps> = ({
  id,
  name,
  gender,
  ssn,
  occupation,
  entries,
}) => {
  const [newEntryVisible, setNewEntryVisible] = useState(false);
  const [entriesState, setEntriesState] = useState(entries);
  const [error, setError] = useState<string>();

  const renderGenderIcon = () => {
    if (gender === "male") {
      return <Male color="primary" />;
    } else if (gender === "female") {
      return <Female color="primary" />;
    } else {
      return null;
    }
  };

  const toggleNewEntryForm = () => {
    setNewEntryVisible(!newEntryVisible);
  };

  const handleSubmit = async (entry: EntryWithoutId) => {
    try {
      const savedEntry = await PatientsService.addEntry(id, entry);
      setEntriesState([...entriesState, savedEntry]);
      setNewEntryVisible(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    }
  };

  return (
    <Stack direction="column" spacing={2} alignItems="left">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar>{renderGenderIcon()}</Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" color="text.secondary">
        SSN Number: {ssn}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Occupation: {occupation}
      </Typography>
      <Button variant="contained" onClick={toggleNewEntryForm}>
        New Entry
      </Button>
      {newEntryVisible ? (
        <NewEntryForm onSubmit={handleSubmit} error={error} />
      ) : null}
      <Typography variant="h6" component="div">
        Entries:
      </Typography>
      <EntriesInfo entries={entriesState} />
    </Stack>
  );
};

export default PatientInfo;
