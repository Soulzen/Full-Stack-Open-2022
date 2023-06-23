import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BsPersonHeart } from "react-icons/bs";
import { RiHealthBookFill, RiHospitalFill } from "react-icons/ri";

import { Entry } from "../../types";
import DiagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

interface EntriesInfoProps {
  entries: Entry[];
}

const EntriesInfo: React.FC<EntriesInfoProps> = ({ entries }) => {
  const [diagnoses, setDiagnoses] = useState<{ [code: string]: string }>({});

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const uniqueCodes = Array.from(
        new Set(entries.flatMap((entry) => entry.diagnosisCodes ?? []))
      );

      const diagnosisPromises = uniqueCodes
        .filter((code) => code !== undefined) // Filter out undefined values
        .map((code) => {
          return DiagnosesService.getDiagnosisByCode(code!); // Use non-null assertion operator
        });

      const resolvedDiagnoses = await Promise.all(diagnosisPromises);

      const diagnosisMap: { [code: string]: string } = {};
      resolvedDiagnoses.forEach((diagnosis) => {
        diagnosisMap[diagnosis.code] = diagnosis.name;
      });

      setDiagnoses(diagnosisMap);
    };

    fetchDiagnoses();
  }, [entries]);

  const getEntryTypeIcon = (type: string) => {
    switch (type) {
      case "HealthCheck":
        return <BsPersonHeart />;
      case "OccupationalHealthcare":
        return <RiHealthBookFill />;
      case "Hospital":
        return <RiHospitalFill />;
      default:
        return null;
    }
  };

  return (
    <div>
      {entries.map((entry) => {
        return (
          <Box
            key={entry.id}
            sx={{ border: "1px solid #ccc", padding: "16px", margin: "8px 0" }}
          >
            <Typography variant="h6">
              {entry.date} {getEntryTypeIcon(entry.type)}
            </Typography>
            <Typography variant="body1">{entry.description}</Typography>
            {/* Render diagnosis codes if available */}
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <div>
                <Typography variant="body1">Diagnosis Codes:</Typography>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} - {diagnoses[code]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <EntryDetails entry={entry} />
            <Typography variant="body1">
              diagnose by {entry.specialist}
            </Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default EntriesInfo;
