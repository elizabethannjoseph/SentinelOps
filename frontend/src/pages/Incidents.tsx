import { useEffect, useState } from "react";

interface Incident {
  id: number;
  service_name: string;
  event: string;
  status: string;
  checked_at: string;
  response_time_ms: number;
  error_message: string | null;
}

function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/incidents")
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>🚨 Incident Timeline</h1>

      <table className="history-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Service</th>
            <th>Event</th>
            <th>Error</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>
                {new Date(
                  incident.checked_at + "Z"
                ).toLocaleString()}
              </td>

              <td>{incident.service_name}</td>

              <td>
                {incident.event === "Down"
                  ? "🔴 Down"
                  : "🟢 Recovered"}
              </td>

              <td>{incident.error_message ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Incidents;