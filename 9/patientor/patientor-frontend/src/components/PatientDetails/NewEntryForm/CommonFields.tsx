import {
  Checkbox,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Diagnosis } from "../../../types";

interface CommonFieldsProps {
  codes: Array<Diagnosis>;
  description: string;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  specialist: string;
  handleSpecialistChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diagnosisCodes: Array<string>;
  handleDiagnosisCodes: (event: SelectChangeEvent<string[]>) => void;
}

export const CommonFields = ({
  codes,
  description,
  handleDescriptionChange,
  date,
  handleDateChange,
  specialist,
  handleSpecialistChange,
  diagnosisCodes,
  handleDiagnosisCodes,
}: CommonFieldsProps) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Typography variant="body1">Date</Typography>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Input type="Date" fullWidth value={date} onChange={handleDateChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={handleSpecialistChange}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel id="codes-multiple-checkbox-label">
          Diagnosis Codes
        </InputLabel>
        <Select
          labelId="codes-multiple-checkbox-label"
          id="code-multiple-checkbox"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisCodes}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          // MenuProps={MenuProps}
        >
          {codes.map((code) => (
            <MenuItem key={code.code} value={code.code}>
              <Checkbox checked={diagnosisCodes.indexOf(code.code) > -1} />
              <ListItemText primary={`${code.code} - ${code.name}`} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};
