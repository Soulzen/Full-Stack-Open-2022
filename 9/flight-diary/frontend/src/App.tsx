import { useEffect, useState } from "react";
// import axios from "axios";

import { NonSensitiveDiaryEntry, SoftDiaryEntry } from "./types";
import { addEntry, getAllEntries } from "./services/diaryEntryService";
import DiaryEntries from "./components/diaryEntries";
import AddEntry from "./components/addEntryForm";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  const handleAddEntry = (newEntry: SoftDiaryEntry) => {
    addEntry(newEntry)
      .then((savedEntry) => {
        setDiaries([...diaries, savedEntry]);
      })
      .catch((error) => {
        console.log(error);
        // if (axios.isAxiosError(error)) {
        //   const errorMessage = "Problem saving the entry";
        //   setError({ error: true, message: errorMessage });
        //   setTimeout(() => {
        //     setError({ error: false, message: "" });
        //   }, 3000);
        // } else {
        setError({
          error: true,
          message: "An error occurred while saving the entry",
        });
        setTimeout(() => {
          setError({ error: false, message: "" });
        }, 3000);
        // }
      });
  };

  useEffect(() => {
    getAllEntries()
      .then((entries) => {
        setDiaries(entries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <AddEntry handleAddEntry={handleAddEntry} error={error} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
