interface AlertBannerProps {
  downServices: string[];
}

export default function AlertBanner({
  downServices,
}: AlertBannerProps) {
  const hasIssues = downServices.length > 0;

  return (
    <div className={`alert-banner ${hasIssues ? "danger" : "success"}`}>
      <div>
        <h3>
          {hasIssues
            ? `🚨 ${downServices.length} Service${
                downServices.length > 1 ? "s" : ""
              } Down`
            : "🟢 All Systems Operational"}
        </h3>

        <p>
          {hasIssues
            ? `Affected: ${downServices.join(", ")}`
            : "All monitored services are healthy."}
        </p>
      </div>
    </div>
  );
}