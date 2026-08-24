import { useState } from "react";
import ChartRenderer from "./ChartRenderer";
import "../ProductChart.css";

export default function AIChart({
    categories = [],
    heatmap = [],
    recentOrders = [],
    onGenerate
}) {

    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);

    const [chartSpec, setChartSpec] = useState({
        type: "bar",
        title: "Inventory by Category",
        subtitle: "Current inventory across categories",
        dataSource: "categories"
    });



    const safeCategories = Array.isArray(categories)
        ? categories
        : [];

    const safeHeatmap = Array.isArray(heatmap)
        ? heatmap
        : [];

    const safeRecentOrders = Array.isArray(recentOrders)
        ? recentOrders
        : [];




    const categoryData = safeCategories
        .map((item) => ({
            name: item?.category ?? "Unknown",
            value: Number(item?.total) || 0
        }))
        .filter(
            (item) =>
                item.name &&
                Number.isFinite(item.value)
        );




    const heatmapData = safeHeatmap
        .map((item) => ({
            product:
                item?.product ??
                item?.product_name ??
                item?.productName ??
                "Unknown",

            warehouse:
                item?.warehouse ??
                item?.warehouse_name ??
                item?.warehouseName ??
                item?.location ??
                item?.location_name ??
                "Unknown",

            quantity: Number(
                item?.quantity ??
                item?.available ??
                item?.available_quantity ??
                item?.stock ??
                item?.total ??
                0
            )
        }))
        .filter(
            (item) =>
                item.product !== "Unknown" &&
                item.warehouse !== "Unknown"
        );



    const orderData = safeRecentOrders
        .map((item) => ({
            name:
                item?.customer_name ??
                item?.customer ??
                `Order ${item?.id ?? ""}`,

            value: Number(
                item?.total_amount ??
                item?.total ??
                item?.value ??
                0
            )
        }))
        .filter(
            (item) =>
                Number.isFinite(item.value)
        );



    const getChartData = () => {

        switch (chartSpec.dataSource) {

            case "categories":
                return categoryData;

            case "heatmap":
                return heatmapData;

            case "orders":
                return orderData;

            default:
                return categoryData;
        }
    };


    const chartData = getChartData();



    console.log("========== AI CHART ==========");
    console.log("Categories:", safeCategories);
    console.log("Category Data:", categoryData);
    console.log("Heatmap Data:", heatmapData);
    console.log("Orders:", orderData);
    console.log("Chart Spec:", chartSpec);
    console.log("Final Chart Data:", chartData);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const request = prompt.trim();

        if (!request) {
            return;
        }

        setLoading(true);

        try {

            const result = await onGenerate?.(request);

            console.log(
                "Chart AI result:",
                result
            );

            if (result) {

                setChartSpec((previous) => ({
                    ...previous,
                    ...result
                }));

            }

        } catch (error) {

            console.error(
                "Chart AI error:",
                error
            );

        } finally {

            setLoading(false);

            setPrompt("");
        }
    };

    return (
        <div className="product-chart">

            <div className="product-chart-header">

                <div>

                    <h2>
                        {chartSpec.title}
                    </h2>

                    <p>
                        {chartSpec.subtitle}
                    </p>

                </div>

                <span className="ai-badge">
                    ✦ AI
                </span>

            </div>


            <div className="product-chart-body">

                <ChartRenderer
                    type={chartSpec.type}
                    data={chartData}
                    specification={chartSpec}
                />

            </div>


            <form
                className="chart-ai-input"
                onSubmit={handleSubmit}
            >

                <span className="chart-ai-icon">
                    ✦
                </span>

                <input
                    type="text"
                    value={prompt}
                    onChange={(e) =>
                        setPrompt(e.target.value)
                    }
                    placeholder="Ask AI to change this visualization..."
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !prompt.trim()
                    }
                >
                    {loading ? "..." : "→"}
                </button>

            </form>

        </div>
    );
}