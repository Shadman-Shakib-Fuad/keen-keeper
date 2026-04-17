import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="main-content not-found">
      <h1>404</h1>
      <p>Oops! This page doesn't exist.</p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </main>
  );
}