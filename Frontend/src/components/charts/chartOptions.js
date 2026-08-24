export function createPieOption(data, specification = {}) {
    return {
        tooltip: {
            trigger: "item"
        },

        legend: {
            orient: "vertical",
            right: 20,
            top: "center",

            textStyle: {
                color: "#64748b"
            }
        },

        series: [
            {
                name: specification.metric || "Inventory",

                type: "pie",

                radius: specification.donut
                    ? ["45%", "70%"]
                    : "65%",

                center: ["38%", "50%"],

                itemStyle: {
                    borderColor: "#ffffff",
                    borderWidth: 3,
                    borderRadius: 6
                },

                label: {
                    show: false
                },

                labelLine: {
                    show: false
                },

                data
            }
        ]
    };
}


export function createBarOption(data, specification = {}) {

    const categories = data.map(item => item.name);
    const values = data.map(item => item.value);

    return {
        tooltip: {
            trigger: "axis"
        },

        grid: {
            left: 50,
            right: 30,
            top: 40,
            bottom: 70,
            containLabel: true
        },

        xAxis: {
            type: "category",
            data: categories,

            axisLabel: {
                interval: 0,
                rotate: 35
            }
        },

        yAxis: {
            type: "value",
            name: specification.yAxis || "Quantity"
        },

        series: [
            {
                name: "Inventory",
                type: "bar",
                data: values,

                barMaxWidth: 35,

                itemStyle: {
                    borderRadius: [6, 6, 0, 0]
                }
            }
        ]
    };
}


export function createLineOption(data, specification = {}) {

    const categories = data.map(
        item => item.name
    );

    const values = data.map(
        item => item.value
    );

    return {
        tooltip: {
            trigger: "axis"
        },

        grid: {
            left: 50,
            right: 30,
            top: 40,
            bottom: 50,
            containLabel: true
        },

        xAxis: {
            type: "category",
            data: categories
        },

        yAxis: {
            type: "value",
            name: specification.yAxis || "Quantity"
        },

        series: [
            {
                type: "line",

                smooth: true,

                symbol: "circle",

                symbolSize: 7,

                data: values,

                areaStyle: specification.area
                    ? {
                        opacity: 0.08
                    }
                    : undefined
            }
        ]
    };
}
export function createScatterOption(data, specification = {}) {
    return {
        tooltip: {
            trigger: "item"
        },

        grid: {
            left: 55,
            right: 30,
            top: 40,
            bottom: 50,
            containLabel: true
        },

        xAxis: {
            type: "value",
            name: specification.xAxis || "X"
        },

        yAxis: {
            type: "value",
            name: specification.yAxis || "Y"
        },

        series: [
            {
                name: specification.seriesName || "Data",
                type: "scatter",

                symbolSize: specification.symbolSize || 12,

                data: data.map(item => [
                    Number(item.x),
                    Number(item.y)
                ])
            }
        ]
    };
}
export function createHeatmapOption(data = [], specification = {}) {

    const warehouses = [
        ...new Set(
            data
                .map(item => item.warehouse)
                .filter(Boolean)
        )
    ];

    const products = [
        ...new Set(
            data
                .map(item => item.product)
                .filter(Boolean)
        )
    ];

    const values = data
        .map(item => {

            const x = warehouses.indexOf(
                item.warehouse
            );

            const y = products.indexOf(
                item.product
            );

            return [
                x,
                y,
                Number(item.quantity) || 0
            ];
        })
        .filter(
            item =>
                item[0] >= 0 &&
                item[1] >= 0
        );


    const maxValue = Math.max(
        ...values.map(item => item[2]),
        1
    );


    return {

        tooltip: {
            position: "top",

            formatter: params => {

                const [
                    x,
                    y,
                    value
                ] = params.value;

                return `
                    <strong>
                        ${products[y]}
                    </strong>
                    <br/>
                    ${warehouses[x]}
                    <br/>
                    Stock: ${value}
                `;
            }
        },


        grid: {
            left: 140,
            right: 30,
            top: 20,
            bottom: 80,
            containLabel: true
        },


        xAxis: {
            type: "category",
            data: warehouses,

            axisLabel: {
                color: "#475569",
                fontSize: 13
            }
        },


        yAxis: {
            type: "category",
            data: products,

            axisLabel: {
                color: "#475569",
                fontSize: 12
            }
        },


        visualMap: {
            min: 0,
            max: maxValue,

            calculable: true,

            orient: "horizontal",

            left: "center",

            bottom: 10
        },


        series: [
            {
                name: "Stock",

                type: "heatmap",

                data: values,

                label: {
                    show: true,

                    color: "#0f172a"
                },

                emphasis: {
                    disabled: true
                }
            }
        ]
    };
}
export function createSankeyOption(data = {}) {
    return {
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
        },

        series: [
            {
                type: "sankey",

                data: Array.isArray(data.nodes)
                    ? data.nodes
                    : [],

                links: Array.isArray(data.links)
                    ? data.links
                    : [],

                emphasis: {
                    focus: "adjacency"
                },

                lineStyle: {
                    color: "gradient",
                    curveness: 0.5
                },

                label: {
                    color: "#0f172a"
                }
            }
        ]
    };
}
export function createRadarOption(data, specification = {}) {

    const indicators = specification.indicators || [];

    return {
        tooltip: {},

        radar: {
            indicator: indicators.map(item => ({
                name: item.name,
                max: item.max || 100
            }))
        },

        series: [
            {
                type: "radar",

                data: data.map(item => ({
                    name: item.name,
                    value: item.values
                }))
            }
        ]
    };
}
export function createGaugeOption(data, specification = {}) {

    const value = Number(data?.[0]?.value || 0);

    return {
        series: [
            {
                type: "gauge",

                min: 0,
                max: specification.max || 100,

                progress: {
                    show: true,
                    width: 18
                },

                axisLine: {
                    lineStyle: {
                        width: 18
                    }
                },

                detail: {
                    valueAnimation: true,
                    formatter: "{value}%"
                },

                data: [
                    {
                        value
                    }
                ]
            }
        ]
    };
}