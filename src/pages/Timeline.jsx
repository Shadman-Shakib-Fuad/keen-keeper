import { useState } from "react";
import { Phone, MessageSquare, Video } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const typeIcon = {
  Call: <Phone size={20} />,
  Text: <MessageSquare size={20} />,
  Video: <Video size={20} />,
};

const filters = ["All", "Call", "Text", "Video"];

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
  };

  return (
    <main className="main-content">
      <div className="timeline-wrapper">
        <h1 className="page-title">Timeline</h1>

        {}
        <div className="timeline-filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            {filters.map((f) => (
              <option key={f} value={f}>{f === "All" ? "Filter timeline" : f}</option>
            ))}
          </select>
        </div>

        {}
        <div className="timeline-list">
          {filtered.map((entry) => (
            <div key={entry.id} className="timeline-entry">
              <div className="timeline-icon">{typeIcon[entry.type]}</div>
              <div className="timeline-info">
                <p className="timeline-title">
                  <strong>{entry.type}</strong> with {entry.friendName}
                </p>
                <p className="timeline-date">{formatDate(entry.date)}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="empty-state">No {filter.toLowerCase()} entries yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}