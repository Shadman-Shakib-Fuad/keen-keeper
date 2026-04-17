import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

const initialEntries = [
  { id: 1, type: "Call", friendName: "Marcus Johnson", date: "2026-03-19" },
  { id: 2, type: "Text", friendName: "Sarah Chen", date: "2026-03-28" },
  { id: 3, type: "Video", friendName: "Aisha Patel", date: "2026-03-23" },
  { id: 4, type: "Call", friendName: "Olivia Martinez", date: "2026-03-11" },
  { id: 5, type: "Text", friendName: "Olivia Martinez", date: "2026-03-13" },
  { id: 6, type: "Call", friendName: "Tom Baker", date: "2026-03-29" },
  { id: 7, type: "Video", friendName: "Priya Nair", date: "2026-03-17" },
  { id: 8, type: "Text", friendName: "David Kim", date: "2026-03-21" },
];

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  const addEntry = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: new Date().toISOString().split("T")[0],
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}