import "./KpiCard.css";

export default function KpiCard({
    title,
    value,
    icon,
    color
}) {

    return (

        <div className="kpi-card">

            <div className="kpi-header">

                <div>

                    <p className="kpi-title">
                        {title}
                    </p>

                    <h1 className="kpi-value">
                        {value}
                    </h1>

                </div>

                <div
                    className="kpi-icon"
                    style={{
                        background: color
                    }}
                >
                    {icon}
                </div>

            </div>

        </div>

    );

}