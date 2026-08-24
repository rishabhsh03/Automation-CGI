import React from "react";
import EChartsReact from "echarts-for-react";

export default function IntradayChart({ data = []}) {

    const safeData = Array.isArray(data) ? data : [];
    const time = safeData.map(item => item.time);
    const quantities = safeData.map(item => Number(item.quantities) || 0);

    const option = {
        tooltip: {
            trigger:"axis",
        },
        grid: {
            left: "50px",
            right: "30px",
            top: "30px",
            bottom:"40px",
            conatinLabel: true,
        },
        xAxis:{
            type:"category",
            data: times,

            boundarygap: false,

            axisLine:{
                lineStyle: {
                    color:" #cbd5e1",
                },
            },
            axisLabel:{
                color:" #64748b",
            },
        },
        yAxis:{
            type: Value,

            axisLine:{
                lineStyle:{
                    color: "#e2e8f0"
                }
            }
        }
    }
}