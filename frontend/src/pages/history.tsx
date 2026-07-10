import { useEffect, useState } from "react";
import "../App.css";

interface HealthResult {
  id: number;
  service_name: string;
  status: string;
  response_time_ms: number;
  checked_at: string;
}

export default function History() {
  const [history, setHistory] = useState<HealthResult[]>([]);

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

  return (
    <div className="container">
      <h1>History</h1>
      <p className="subtitle">
        View historical health checks for all monitored services.
      </p>
      <table className="history-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Service</th>
            <th>Status</th>
            <th>Response Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>
                {new Date(item.checked_at + "Z").toLocaleString()}
              </td>
              <td>{item.service_name}</td>
              <td>
                <span
                  className={
                    item.status === "Healthy"
                      ? "status-badge healthy"
                      : "status-badge down"
                  }
                >
                  {item.status}
                </span>
              </td>
              <td>{item.response_time_ms.toFixed(2)} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}