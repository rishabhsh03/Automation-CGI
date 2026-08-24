import ReactECharts from "echarts-for-react";

import {
    createPieOption,
    createBarOption,
    createLineOption,
    createScatterOption,
    createHeatmapOption,
    createSankeyOption,
    createRadarOption,
    createGaugeOption
} from "./chartOptions";


export default function ChartRenderer({
    type = "pie",
    data = [],
    specification = {}
}) {

    let option;

    switch (type) {


        case "pie":

            option = createPieOption(
                data,
                specification
            );

            break;



        case "donut":

            option = createPieOption(
                data,
                {
                    ...specification,
                    donut: true
                }
            );

            break;



        case "bar":

            option = createBarOption(
                data,
                specification
            );

            break;



        case "horizontal_bar":

            option = createBarOption(
                data,
                specification
            );

            if (option.xAxis && option.yAxis) {

                option.xAxis = {
                    type: "value",
                    name: specification.xAxis || "Quantity"
                };

                option.yAxis = {
                    type: "category",
                    data: data.map(
                        item => item.name
                    ),
                    inverse: true
                };

                option.series[0].data =
                    data.map(
                        item => item.value
                    );
            }

            break;



        case "line":

            option = createLineOption(
                data,
                specification
            );

            break;



        case "area":

            option = createLineOption(
                data,
                {
                    ...specification,
                    area: true
                }
            );

            break;



        case "scatter":

            option = createScatterOption(
                data,
                specification
            );

            break;



        case "heatmap":

            option = createHeatmapOption(
                data,
                specification
            );

            break;



        case "sankey":

            option = createSankeyOption(
                data,
                specification
            );

            break;



        case "radar":

            option = createRadarOption(
                data,
                specification
            );

            break;


        case "gauge":

            option = createGaugeOption(
                data,
                specification
            );

            break;


        default:

            console.warn(
                `Unsupported chart type: ${type}`
            );

            option = createBarOption(
                data,
                specification
            );
    }


    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{
                width: "100%",
                height: "320px"
            }}
        />
    );
}