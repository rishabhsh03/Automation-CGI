export const VISUALIZATION_TYPE = {
    PIE:"pie",
    DOUNT:"dount",

    BAR:"bar",
    HORIZONTAL_BAR:"horizontal_bar",

    LINE:"line",
    AREA:"area",

    SCATTER:"scatter",

    HEATMAP: "heatmap",

    RADAR: "radar",

    FUNNEL: "funnel",

    GAUGE:"gauge",

    TREEMAP: "treemap",

    SUNBRUST: "sunbrust",

    SANKEY:"sankey",

    WATERFALL:"waterfall",

    HISTOGRAM: "histogram",

    BOXPLOT: "boxplot"
};

export const SUPPORTED_VISUALIZATION = object.values(
    VISUALIZATION_TYPE
)