import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, MessageSquare, Video, Bell, Archive, Trash2, Edit } from "lucide-react";
import friendsData from "../data/friends.json";
import { useTimeline } from "../context/TimelineContext";
import Toast from "../components/Toast";

const statusClass = {
  "on-track": "status-on-track",
  "almost due": "status-almost-due",
  "overdue": "status-overdue",
};
const statusLabel = {
  "on-track": "On Track",
  "almost due": "Almost Due",
  "overdue": "Overdue",
};

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [toast, setToast] = useState(null);

  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    navigate("/404");
    return null;
  }

  const handleCheckin = (type) => {
    addEntry(type, friend.name);
    setToast(`${type} with ${friend.name} logged!`);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  return (
    <main className="main-content">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="detail-wrapper">
        {}
        <div className="detail-left">
          <div className="detail-profile">
            <img src={friend.picture} alt={friend.name} className="detail-avatar" />
            <h2 className="detail-name">{friend.name}</h2>
            <span className={`status-badge ${statusClass[friend.status]}`}>
              {statusLabel[friend.status]}
            </span>
            <div className="friend-tags" style={{ justifyContent: "center", marginTop: "8px" }}>
              {friend.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <p className="detail-bio">"{friend.bio}"</p>
            <p className="detail-email">Preferred: email</p>
          </div>

          <div className="detail-actions">
            <button className="action-btn"><Bell size={16} /> Snooze 2 Weeks</button>
            <button className="action-btn"><Archive size={16} /> Archive</button>
            <button className="action-btn danger"><Trash2 size={16} /> Delete</button>
          </div>
        </div>

        {}
        <div className="detail-right">
          {}
          <div className="stats-cards">
            <div className="stat-card">
              <span className="stat-number">{friend.days_since_contact}</span>
              <span className="stat-label">Days Since Contact</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{friend.goal}</span>
              <span className="stat-label">Goal (Days)</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{formatDate(friend.next_due_date)}</span>
              <span className="stat-label">Next Due</span>
            </div>
          </div>

          {}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3>Relationship Goal</h3>
              <button className="edit-btn"><Edit size={14} /> Edit</button>
            </div>
            <p>Connect every <strong>{friend.goal} days</strong></p>
          </div>

          {}
          <div className="detail-card">
            <h3>Quick Check-In</h3>
            <div className="checkin-buttons">
              <button className="checkin-btn" onClick={() => handleCheckin("Call")}>
                <Phone size={22} />
                <span>Call</span>
              </button>
              <button className="checkin-btn" onClick={() => handleCheckin("Text")}>
                <MessageSquare size={22} />
                <span>Text</span>
              </button>
              <button className="checkin-btn" onClick={() => handleCheckin("Video")}>
                <Video size={22} />
                <span>Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}