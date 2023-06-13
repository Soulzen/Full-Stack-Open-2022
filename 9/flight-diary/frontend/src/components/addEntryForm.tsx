import React, { useState } from "react";

import { SoftDiaryEntry } from "../types";

const AddEntryForm = ({
  handleAddEntry,
  error,
}: {
  handleAddEntry: (newEntry: SoftDiaryEntry) => void;
  error: {
    error: boolean;
    message: string;
  };
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: SoftDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    try {
      handleAddEntry(newEntry);
    } catch (error) {
      console.log("Error en comp>", error);
    }
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add Entry</h2>
      {error.error ? <p>{error.message}</p> : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <div>
            <label>
              <input
                type="radio"
                value="great"
                checked={visibility === "great"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Great
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="good"
                checked={visibility === "good"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="ok"
                checked={visibility === "ok"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              OK
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="poor"
                checked={visibility === "poor"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Poor
            </label>
          </div>
        </div>
        <div>
          <label>Weather:</label>
          <div>
            <label>
              <input
                type="radio"
                value="sunny"
                checked={weather === "sunny"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Sunny
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="rainy"
                checked={weather === "rainy"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Rainy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="cloudy"
                checked={weather === "cloudy"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Cloudy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="stormy"
                checked={weather === "stormy"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Stormy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="windy"
                checked={weather === "windy"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Windy
            </label>
          </div>
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default AddEntryForm;
