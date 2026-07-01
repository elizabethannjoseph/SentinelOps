import { useEffect, useState } from "react";

interface HealthResult {
  id: number;
  service_name: string;
  status: string;
  response_time_ms: number;
  checked_at: string;
}

export default function History() {

  const [history, setHistory] = useState<HealthResult[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/history")
        .then((res) => res.json())
        .then((data) => {
        console.log("History data:", data);
        setHistory(data);
        })
    .catch((err) => console.error(err));
    }, []);
console.log(history);
console.log(history.length);
  return (
    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Status</th>
          <th>Response Time</th>
          <th>Checked At</th>
        </tr>
      </thead>

      <tbody>
        {history.map((item) => (
          <tr key={item.id}>
            <td>{item.service_name}</td>
            <td
                style={{
                    color: item.status === "Healthy" ? "green" : "red",
                fontWeight: "bold",
            }}
>
  {item.status}
</td>
            <td>{item.response_time_ms.toFixed(4)} ms</td>
            <td>{new Date(item.checked_at + "Z").toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}