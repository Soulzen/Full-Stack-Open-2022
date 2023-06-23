import axios from "axios";

import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getDiagnosisByCode = async (code: string): Promise<Diagnosis> => {
  const diagnosis = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
  return diagnosis.data;
};

const DiagnosesService = { getDiagnosisByCode };

export default DiagnosesService;
