import "./SummaryCard.css";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <div className="summary-card-v2">
      <div className="summary-header">
        <div className="summary-icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="summary-value">
        {value}
      </div>
    </div>
  );
}