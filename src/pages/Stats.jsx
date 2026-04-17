import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useTimeline } from "../context/TimelineContext";

const COLORS = ["#7c3aed", "#1e3a2f", "#22c55e"];

export default function Stats() {
  const { entries } = useTimeline();

  const counts = entries.reduce(
    (acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 }
  );

  const data = [
    { name: "Text", value: counts.Text },
    { name: "Call", value: counts.Call },
    { name: "Video", value: counts.Video },
  ];

  return (
    <main className="main-content">
      <div className="stats-wrapper">
        <h1 className="page-title">Friendship Analytics</h1>

        <div className="analytics-card">
          <p className="analytics-subtitle">By Interaction Type</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}