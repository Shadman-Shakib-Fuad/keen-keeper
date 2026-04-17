import { useNavigate } from "react-router-dom";

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

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div className="friend-card" onClick={() => navigate(`/friend/${friend.id}`)}>
      <img src={friend.picture} alt={friend.name} className="friend-avatar" />
      <h3 className="friend-name">{friend.name}</h3>
      <p className="friend-days">{friend.days_since_contact}d ago</p>
      <div className="friend-tags">
        {friend.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <span className={`status-badge ${statusClass[friend.status]}`}>
        {statusLabel[friend.status]}
      </span>
    </div>
  );
}