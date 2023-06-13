import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntries = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diarie) => (
        <div key={diarie.id}>
          <h3>{diarie.date}</h3>
          <p>visibility: {diarie.visibility}</p>
          <p>weather: {diarie.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
