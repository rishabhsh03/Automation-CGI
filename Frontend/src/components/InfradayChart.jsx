import EChartsReact from "echarts-for-react";

export default function IntradayChart({ data = [] }) {
    const safeData = Array.isArray(data) ? data : [];
    const time = safeData.map(item => item.time);
    const quantities = safeData.map(item => Number(item.quantities) || 0);

    const option = {
        tooltip: {
            trigger: "axis",
        },
        grid: {
            left: "50px",
            right: "30px",
            top: "30px",
            bottom: "40px",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: time,
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: "#cbd5e1",
                },
            },
            axisLabel: {
                color: "#64748b",
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#e2e8f0",
                },
            },
        },
        series: [
            {
                data: quantities,
                type: "line",
                smooth: true,
            },
        ],
    };

    return <EChartsReact option={option} style={{ height: "100%", width: "100%" }} />;
}
