import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import friendsData from "../data/friends.json";
import { useTimeline } from "../context/TimelineContext";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { entries } = useTimeline();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter((f) => f.status === "overdue" || f.status === "almost due").length;
  const interactionsThisMonth = entries.length;

  return (
    <main className="main-content">
      {/* Banner */}
      <section className="banner">
        <h1 className="banner-title">Friends to keep close in your life</h1>
        <p className="banner-subtitle">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="btn-primary">
          <UserPlus size={16} /> Add a Friend
        </button>
      </section>

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="summary-card">
          <span className="summary-number">{totalFriends}</span>
          <span className="summary-label">Total Friends</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{onTrack}</span>
          <span className="summary-label">On Track</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{needAttention}</span>
          <span className="summary-label">Need Attention</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{interactionsThisMonth}</span>
          <span className="summary-label">Interactions This Month</span>
        </div>
      </section>

      {/* Friends Grid */}
      <section className="friends-section">
        <h2 className="section-title">Your Friends</h2>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your friends...</p>
          </div>
        ) : (
          <div className="friends-grid">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}