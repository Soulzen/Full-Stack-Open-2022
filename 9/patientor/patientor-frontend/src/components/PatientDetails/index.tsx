import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientInfo from "./PatientInfo";
import patientService from "../../services/patients";
import { PatientWithRequiredInfo } from "../../types";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<PatientWithRequiredInfo>();

  useEffect(() => {
    patientService.getPatientById(id).then((result) => {
      setPatient(result.data);
    });
  }, [id]);

  return patient === undefined ? null : <PatientInfo {...patient} />;
};

export default PatientDetails;
