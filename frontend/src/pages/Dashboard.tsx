import { useEffect, useState } from "react";
import "../App.css";

interface HealthResult {
  id: number;
  service_name: string;
  status: string;
  response_time_ms: number;
  checked_at: string;
  error_message: string | null;
  consecutive_failures: number;
}

function Dashboard() {
  const [results, setResults] = useState<HealthResult[]>([]);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const totalServices = results.length;

  const healthyServices = results.filter(
    (result) => result.status === "Healthy"
  ).length;

  const downServices = results.filter(
    (result) => result.status === "Down"
  ).length;

  const lastUpdated =
    results.length > 0
      ? new Date(results[0].checked_at + "Z").toLocaleString()
      : "--";

  const fetchHealth = () => {
    fetch("http://localhost:8000/api/health")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHealth();

    const interval = setInterval(fetchHealth, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🛡️ SentinelOps TEST!!</h1>

      <p className="subtitle">
        DevSecOps Health Monitoring Dashboard
      </p>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Services</h3>
          <p>{totalServices}</p>
        </div>

        <div className="summary-card">
          <h3>Healthy</h3>
          <p>{healthyServices}</p>
        </div>

        <div className="summary-card">
          <h3>Down</h3>
          <p>{downServices}</p>
        </div>

        <div className="summary-card">
          <h3>Last Update</h3>
          <p>{lastUpdated}</p>
        </div>
      </div>

      <div className="grid">
        {results.map((result) => (
          <div className="card" 
               key={result.id}
               onClick={() =>
                  setExpandedService(
                    expandedService === result.id ? null : result.id
                  )
                }>
            <h2>{result.service_name}</h2>

            <div className="status">
              <span
                className={
                  result.status === "Healthy"
                    ? "dot green"
                    : "dot red"
                }
              ></span>

              <span>{result.status}</span>
            </div>

            <div className="info">
              <p>
                <strong>Response Time</strong>
              </p>
              <p>{result.response_time_ms.toFixed(4)} ms</p>
            </div>

            <div className="info">
              <p>
                <strong>Last Checked</strong>
              </p>
              <p>
                {new Date(result.checked_at + "Z").toLocaleString()}
              </p>
            </div>
            {expandedService === result.id && (
            <div className="details">
            <div className="info">
              <p>
                <strong>Consecutive Failures</strong>
              </p>
              <p>{result.consecutive_failures}</p>
            </div>

            <div className="info">
              <p>
                <strong>Error</strong>
              </p>
              <p>{result.error_message ?? "None"}</p>
            </div>
        </div>
          )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;