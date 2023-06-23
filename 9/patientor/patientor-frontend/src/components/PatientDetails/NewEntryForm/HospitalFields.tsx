import { Grid, Input, TextField, Typography } from "@mui/material";

interface HospitalFieldsProps {
  dischargeDate: string;
  handleDischargeDateChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  dischargeCriteria: string;
  handleDischargeCriteriaChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const HospitalFields = ({
  dischargeDate,
  handleDischargeDateChange,
  dischargeCriteria,
  handleDischargeCriteriaChange,
}: HospitalFieldsProps) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">Discharge Date</Typography>
        <Input
          type="date"
          fullWidth
          value={dischargeDate}
          onChange={handleDischargeDateChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={handleDischargeCriteriaChange}
        />
      </Grid>
    </>
  );
};
