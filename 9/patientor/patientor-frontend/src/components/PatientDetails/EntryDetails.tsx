import { Typography } from "@mui/material";
import { BsFillHeartPulseFill } from "react-icons/bs";

import { Entry, HealthCheckRating } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const getHealthCheckRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <BsFillHeartPulseFill style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk:
        return <BsFillHeartPulseFill style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk:
        return <BsFillHeartPulseFill style={{ color: "orange" }} />;
      case HealthCheckRating.CriticalRisk:
        return <BsFillHeartPulseFill style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return getHealthCheckRatingIcon(entry.healthCheckRating);

    case "OccupationalHealthcare":
      return <Typography>{`Employer Name: ${entry.employerName}`}</Typography>;
    case "Hospital":
      return (
        <div>
          <Typography>{`Discharge Date: ${entry.discharge.date}`} </Typography>
          <Typography>{`Discharge Criteria: ${entry.discharge.criteria}`}</Typography>
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

function assertNever(entry: never): never {
  throw new Error("Function not implemented.");
}
