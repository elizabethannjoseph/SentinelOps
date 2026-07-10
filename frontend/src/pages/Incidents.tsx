import { useEffect, useState } from "react";
import "../App.css";

interface Incident {
  id: number;
  service_name: string;
  event: string;
  status: string;
  checked_at: string;
  response_time_ms: number;
  error_message: string | null;
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const fetchIncidents = () => {
    fetch("http://localhost:8000/api/incidents")
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchIncidents();

    const interval = setInterval(fetchIncidents, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Incident Timeline</h1>

      <p className="subtitle">
        Service outages and recovery events detected by SentinelOps.
      </p>

      <div className="timeline">
        {incidents.map((incident) => (
          <div className="timeline-card" key={incident.id}>
            <div
              className={
                incident.event === "Down"
                  ? "timeline-icon down"
                  : "timeline-icon healthy"
              }
            >
              {incident.event === "Down" ? "🔴" : "🟢"}
            </div>

            <div className="timeline-content">
              <h3>
                {incident.service_name}{" "}
                {incident.event === "Down"
                  ? "went Down"
                  : "Recovered"}
              </h3>

              <p className="timeline-time">
                {new Date(
                  incident.checked_at + "Z"
                ).toLocaleString()}
              </p>

              <p>
                Response Time:{" "}
                {incident.response_time_ms.toFixed(2)} ms
              </p>

              <p>
                Error: {incident.error_message ?? "None"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}