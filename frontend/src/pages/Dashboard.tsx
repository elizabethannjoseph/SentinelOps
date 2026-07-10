import AlertBanner from "../components/AlertBanner";
import { useEffect, useState } from "react";
import "../App.css";
import ResponseTimeChart from "../components/ResponseTimeChart";
import SummaryCard from "../components/SummaryCard";
import ServiceCard from "../components/ServiceCard";
import {
  Server,
  CircleCheckBig,
  CircleAlert,
  Clock3,
} from "lucide-react";

interface HealthResult {
  id: number;
  service_name: string;
  category: string;
  status: string;
  response_time_ms: number;
  checked_at: string;
  error_message: string | null;
  consecutive_failures: number;
}

function Dashboard() {
  const [results, setResults] = useState<HealthResult[]>([]);

  const [expandedService, setExpandedService] = useState<number | null>(null);

  const REFRESH_INTERVAL = 300; // 5 minutes (300 seconds)

  const [refreshCountdown, setRefreshCountdown] = useState(REFRESH_INTERVAL);

  const [searchTerm, setSearchTerm] = useState("");

  const totalServices = results.length;

  const healthyServices = results.filter(
    (result) => result.status === "Healthy"
  ).length;

  const downServices = results.filter(
    (result) => result.status === "Down"
  ).length;

  const downServiceNames = results
  .filter((result) => result.status === "Down")
  .map((result) => result.service_name);

  const lastUpdated =
    results.length > 0
      ? new Date(results[0].checked_at + "Z").toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";

  const fetchHealth = () => {
    fetch("http://localhost:8000/api/health")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHealth();

    const refreshInterval = setInterval(() => {
      fetchHealth();
      setRefreshCountdown(REFRESH_INTERVAL);
    }, REFRESH_INTERVAL * 1000);

    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const minutes = Math.floor(refreshCountdown / 60);

  const seconds = refreshCountdown % 60;

  const countdownText = `${minutes}m ${seconds
    .toString()
    .padStart(2, "0")}s`; 

  const filteredResults = results.filter((result) =>
    result.service_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
     <div className="dashboard-header">
      <div>
        <h1>System Overview</h1>
        <p className="subtitle">
          Monitor your infrastructure in real time.
        </p>
      </div>

      <AlertBanner downServices={downServiceNames} />
    </div>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="summary-grid">
        <SummaryCard
          title="Services"
          value={totalServices}
          subtitle="Currently monitored"
          icon={<Server size={24} />}
        />
        <SummaryCard
          title="Healthy"
          value={healthyServices}
          subtitle="Operational"
          icon={<CircleCheckBig size={24} />}
        />
        <SummaryCard
          title="Down"
          value={downServices}
          subtitle="Needs attention"
          icon={<CircleAlert size={24} />}
        />
        <SummaryCard
          title="Last Update"
          value={lastUpdated}
          subtitle={`Refresh in ${countdownText}`}
          icon={<Clock3 size={24} />}
        />
      </div>
    
        <div className="grid">
          {filteredResults.map((result) => (
            <ServiceCard
              key={result.id}
              serviceName={result.service_name}
              category={result.category}
              status={result.status}
              responseTime={result.response_time_ms}
              checkedAt={result.checked_at}
              errorMessage={result.error_message}
              consecutiveFailures={result.consecutive_failures}
              expanded={expandedService === result.id}
              onToggle={() =>
                setExpandedService(
                  expandedService === result.id ? null : result.id
                )
              }
            />
          ))}
        </div>
      <ResponseTimeChart />
    </div>
  );
}

export default Dashboard;