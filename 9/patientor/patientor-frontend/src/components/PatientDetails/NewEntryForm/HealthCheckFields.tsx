import { Grid, TextField } from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface HealthCheckFieldsProps {
  healthCheckRating: HealthCheckRating;
  handleHealthCheckRatingChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const HealthCheckFields = ({
  healthCheckRating,
  handleHealthCheckRatingChange,
}: HealthCheckFieldsProps) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Health Check Rating"
          type="number"
          fullWidth
          value={healthCheckRating}
          onChange={handleHealthCheckRatingChange}
        />
      </Grid>
    </>
  );
};
