import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const colors: Record<string, string> = {
  GLPI: "#22c55e",
  PostgreSQL: "#3b82f6",
  Prometheus: "#06b6d4",
  Grafana: "#f97316",
  Jenkins: "#a855f7",
  SonarQube: "#eab308",
  MinIO: "#ef4444",
  Nginx: "#ec4899",
};

interface HistoryItem {
  id: number;
  service_name: string;
  response_time_ms: number;
  checked_at: string;
}

export default function ResponseTimeChart() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = () => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchHistory();

    const interval = setInterval(fetchHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  const recentHistory = history.slice(0, 40).reverse();

const groupedData = new Map<string, any>();

recentHistory.forEach((item) => {
  const time = new Date(item.checked_at + "Z").toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!groupedData.has(time)) {
    groupedData.set(time, { time });
  }

  groupedData.get(time)[item.service_name] = item.response_time_ms;
});

const chartData = Array.from(groupedData.values());

const services = [
  ...new Set(history.map((item) => item.service_name)),
];

  return (
    <div className="chart-card">
      <h2>Response Time Trend</h2>

      <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />

        <YAxis unit=" ms" />

        <Tooltip />
    <Legend />
        {services.map((service) => {
        return (
          <Line
          key={service}
          type="monotone"
          dataKey={service}
          stroke={colors[service]}
          strokeWidth={3}
          dot={false}
        />
      );
    })}
  </LineChart>
    </ResponsiveContainer>
  </div>
  );
}