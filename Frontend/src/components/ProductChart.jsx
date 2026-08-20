import ReactECharts from "echarts-for-react";
import "./ProductChart.css";

export default function ProductChart({ categories = [] }) {
    // Make sure backend data is always an array
    const safeCategories = Array.isArray(categories)
        ? categories
        : [];

    // Convert backend data to ECharts format
    const data = safeCategories
        .map((item) => ({
            name: item?.category ?? "Unknown",
            value: Number(
                item?.total ??
                item?.quantity ??
                item?.count ??
                0
            ),
        }))
        .filter((item) => item.value > 0);

    // Sort largest → smallest
    const sortedData = [...data].sort(
        (a, b) => b.value - a.value
    );

    // Keep only top 8
    const topCategories = sortedData.slice(0, 8);

    // Combine remaining categories
    const otherValue = sortedData
        .slice(8)
        .reduce(
            (sum, item) => sum + item.value,
            0
        );

    // Final chart data
    const chartData = [
        ...topCategories,

        ...(otherValue > 0
            ? [
                {
                    name: "Others",
                    value: otherValue,
                },
            ]
            : []),
    ];

    console.log("ProductChart:", {
        categories,
        data,
        chartData,
    });

    const option = {
        tooltip: {
            trigger: "item",

            formatter: (params) => {
                return `
                    <strong>${params.name}</strong><br/>
                    Quantity: ${params.value}<br/>
                    Share: ${params.percent}%
                `;
            },
        },

        legend: {
            orient: "vertical",
            right: 80,
            top: "center",
            type:"scroll",

            itemWidth: 14,
            itemHeight: 14,

            textStyle: {
                color: "#475569",
                fontSize: 13,
            },
        },

        series: [
            {
                name: "Product Distribution",
                type: "pie",

                radius: ["48%", "70%"],

                center: ["35%", "50%"],

                data: chartData,

                // IMPORTANT
                // Don't show 20 labels around the chart
                label: {
                    show: false,
                },

                labelLine: {
                    show: false,
                },

                itemStyle: {
                    borderRadius: 7,
                    borderColor: "#ffffff",
                    borderWidth: 3,
                },

                emphasis: {
                    scale: true,
                    scaleSize: 8,

                    itemStyle: {
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowColor:
                            "rgba(0, 0, 0, 0.15)",
                    },
                },
            },
        ],
    };

    return (
        <div className="product-chart">
            <h2>Product Disribution</h2>
            {chartData.length === 0 ? (
                <div className="product-chart-empty">
                    No product data available
                </div>
            ) : (
                <ReactECharts
                    option={option}
                    style={{
                        width: "100%",
                        height: "360px",
                    }}
                />
            )}

        </div>
    );
}