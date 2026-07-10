import { useEffect, useState } from "react";
import {
  Activity,
  CircleAlert,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Database,
  ClipboardList,
  LineChart,
  Server,
  Tag,
} from "lucide-react";
import "./ServiceCard.css";

interface Props {
  serviceName: string;
  category: string;
  status: string;
  responseTime: number;
  checkedAt: string;
  errorMessage: string | null;
  consecutiveFailures: number;
  expanded: boolean;
  onToggle: () => void;
}

const containerMap: Record<string, string> = {
  GLPI: "sentinelops-glpi-1",
  PostgreSQL: "sentinelops-postgres-1",
  Prometheus: "sentinelops-prometheus-1",
  Grafana: "sentinelops-grafana-1",
  Jenkins: "sentinelops-jenkins-1",
  SonarQube: "sentinelops-sonarqube-1",
  MinIO: "sentinelops-minio-1",
  Nginx: "sentinelops-nginx-1",
};

const getServiceIcon = (service: string) => {
  switch (service.toLowerCase()) {
    case "grafana":
      return <BarChart3 size={22} />;
    case "postgresql":
      return <Database size={22} />;
    case "prometheus":
      return <LineChart size={22} />;
    case "glpi":
      return <ClipboardList size={22} />;
    default:
      return <Server size={22} />;
  }
};

export default function ServiceCard({
  serviceName,
  category,
  status,
  responseTime,
  errorMessage,
  consecutiveFailures,
  expanded,
  onToggle,
}: Props) {
  const [containerInfo, setContainerInfo] = useState<any>(null);

  useEffect(() => {
    if (!expanded) return;

    fetch(
      `http://localhost:8000/api/docker/container/${containerMap[serviceName]}`
    )
      .then((res) => res.json())
      .then((data) => setContainerInfo(data))
      .catch(console.error);
  }, [expanded, serviceName]);

  return (
    <div className="service-card" onClick={onToggle}>
      <div className="service-header">
        <div className="service-title">
          <div className="service-logo">
            {getServiceIcon(serviceName)}
          </div>
          <h2>{serviceName}</h2>
        </div>

        <span
          className={
            status === "Healthy" ? "badge healthy" : "badge down"
          }
        >
          {status}
        </span>
      </div>

      <div className="metric">
        <Activity size={18} />
        <div>
          <small>Response Time</small>
          <p>{responseTime.toFixed(2)} ms</p>
        </div>
      </div>

      <div className="metric">
        <Tag size={18} />
        <div>
          <small>Category</small>
          <p>{category}</p>
        </div>
      </div>

      {expanded && (
        <>
          <div className="divider" />

          <div className="metric">
            <CircleAlert size={18} />
            <div>
              <small>Consecutive Failures</small>
              <p>{consecutiveFailures}</p>
            </div>
          </div>

          <div className="metric">
            <CircleAlert size={18} />
            <div>
              <small>Error</small>
              <p>{errorMessage ?? "None"}</p>
            </div>
          </div>

          {containerInfo && (
            <>
              <div className="metric">
                <Server size={18} />
                <div>
                  <small>Container Status</small>
                  <p>{containerInfo.status}</p>
                </div>
              </div>

              <div className="metric">
                <Activity size={18} />
                <div>
                  <small>CPU Usage</small>
                  <p>{containerInfo.cpu_percent}%</p>
                </div>
              </div>

              <div className="metric">
                <Database size={18} />
                <div>
                  <small>Memory Usage</small>
                  <p>{containerInfo.memory_mb} MB</p>
                </div>
              </div>

              <div className="metric">
                <CircleAlert size={18} />
                <div>
                  <small>Restart Count</small>
                  <p>{containerInfo.restart_count}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="expand">
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </div>
    </div>
  );
}