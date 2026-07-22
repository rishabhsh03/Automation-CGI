import "./KPICard.css";

export default function KPICard({
    icon,
    title,
    value,
    change,
    subtitle,
    color
}) {

    return (

        <div className="kpi-card">

            <div className="kpi-card-header">

                <div
                    className="kpi-icon"
                    style={{ background: color }}
                >

                    {icon}

                </div>

                <span className="kpi-change">

                    {change}

                </span>

            </div>

            <h2 className="kpi-value">

                {value}

            </h2>

            <h4 className="kpi-title">

                {title}

            </h4>

            <p className="kpi-subtitle">

                {subtitle}

            </p>

        </div>

    );

}