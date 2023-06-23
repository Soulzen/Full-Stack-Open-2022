import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";
import { CommonFields } from "./CommonFields";
import { HospitalFields } from "./HospitalFields";
import { HealthCheckFields } from "./HealthCheckFields";
import { OccupationalHealthcareFields } from "./OccupationalHealthcareFields";
import { apiBaseUrl } from "../../../constants";
import axios from "axios";

interface NewEntryFormProps {
  onSubmit: (entry: any) => void;
  error: string | undefined;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSubmit, error }) => {
  const [type, setType] = useState<
    "Hospital" | "HealthCheck" | "OccupationalHealthcare"
  >("Hospital");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [codes, setCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setCodes(response.data);
    };
    fetchCodes();
  }, []);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    switch (value) {
      case "Hospital":
        setType(value);
        break;
      case "HealthCheck":
        setType(value);
        break;
      case "OccupationalHealthcare":
        setType(value);
        break;
      default:
        setType("Hospital");
        break;
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSpecialistChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialist(event.target.value);
  };

  const handleDiagnosisCodes = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDischargeDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDischargeDate(event.target.value);
  };

  const handleDischargeCriteriaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDischargeCriteria(event.target.value);
  };

  const handleHealthCheckRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rating = Number(event.target.value);
    setHealthCheckRating(rating);
  };

  const handleEmployerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmployerName(event.target.value);
  };
  const handleSickLeaveStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSickLeaveStartDate(event.target.value);
  };
  const handleSickLeaveEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSickLeaveEndDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    switch (type) {
      case "Hospital":
        const hospitalEntry: EntryWithoutId = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        onSubmit(hospitalEntry);
        break;
      case "HealthCheck":
        const healthCheckEntry: EntryWithoutId = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        };
        onSubmit(healthCheckEntry);
        break;
      case "OccupationalHealthcare":
        const OccupationalHealthcareEntry: EntryWithoutId = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        onSubmit(OccupationalHealthcareEntry);
        break;
      default:
        break;
    }

    setType("Hospital");
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setDischargeDate("");
    setDischargeCriteria("");
    setHealthCheckRating(0);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">New Hospital Entry</Typography>
        </Grid>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcare">
                Occupational Healthcare
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <CommonFields
          codes={codes}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          date={date}
          handleDateChange={handleDateChange}
          specialist={specialist}
          handleSpecialistChange={handleSpecialistChange}
          diagnosisCodes={diagnosisCodes}
          handleDiagnosisCodes={handleDiagnosisCodes}
        />
        {type === "Hospital" && (
          <HospitalFields
            dischargeDate={dischargeDate}
            handleDischargeDateChange={handleDischargeDateChange}
            dischargeCriteria={dischargeCriteria}
            handleDischargeCriteriaChange={handleDischargeCriteriaChange}
          />
        )}
        {type === "HealthCheck" && (
          <HealthCheckFields
            healthCheckRating={healthCheckRating}
            handleHealthCheckRatingChange={handleHealthCheckRatingChange}
          />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalHealthcareFields
            employerName={employerName}
            handleEmployerNameChange={handleEmployerNameChange}
            sickLeaveStartDate={sickLeaveStartDate}
            handleSickLeaveStartDateChange={handleSickLeaveStartDateChange}
            sickLeaveEndDate={sickLeaveEndDate}
            handleSickLeaveEndDateChange={handleSickLeaveEndDateChange}
          />
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewEntryForm;
