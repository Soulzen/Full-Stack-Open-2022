import { Grid, Input, TextField, Typography } from "@mui/material";

interface OccupationalHealthcareFieldsProps {
  employerName: string;
  handleEmployerNameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  sickLeaveStartDate: string;
  handleSickLeaveStartDateChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  sickLeaveEndDate: string;
  handleSickLeaveEndDateChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const OccupationalHealthcareFields = ({
  employerName,
  handleEmployerNameChange,
  sickLeaveStartDate,
  handleSickLeaveStartDateChange,
  sickLeaveEndDate,
  handleSickLeaveEndDateChange,
}: OccupationalHealthcareFieldsProps) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={handleEmployerNameChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Sick leave</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">Start date</Typography>
        <Input
          type="date"
          placeholder="Sick leave: Start date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={handleSickLeaveStartDateChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">End date</Typography>
        <Input
          type="date"
          aria-label="Sick leave: End date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={handleSickLeaveEndDateChange}
        />
      </Grid>
    </>
  );
};
