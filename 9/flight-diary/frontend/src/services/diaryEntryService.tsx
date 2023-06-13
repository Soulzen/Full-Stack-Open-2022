import axios from "axios";
import { NonSensitiveDiaryEntry, SoftDiaryEntry, DiaryEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllEntries = async () => {
  const result = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return result.data;
};

export const addEntry = async (entry: SoftDiaryEntry) => {
  try {
    const result = await axios.post<DiaryEntry>(baseUrl, entry);
    const savedEntry = result.data;
    return savedEntry;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      isString(error.response.data)
    )
      throw new Error(error.response.data);
    throw new Error("Problem saving the entry");
  }
};

// export const addEntry = (entry: SoftDiaryEntry) => {
//   return axios.post<DiaryEntry>(baseUrl, entry).then((response) => {
//     return response.data;
//   });
// };
