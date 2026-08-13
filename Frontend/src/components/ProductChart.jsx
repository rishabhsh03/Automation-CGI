import React from "react";
import ReactECharts from "echarts-for-react";

export default function ProductChart({ categories = [] }) {
  // Make sure categories is actually an array
  const safeCategories = Array.isArray(categories)
    ? categories
    : [];

  const chartData = safeCategories
    .map((item) => ({
      category: item?.category ?? "Unknown",
      total: Number(item?.total ?? item?.count ?? 0),
    }))
    .filter((item) => Number.isFinite(item.total))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const option = {
    title: {
      text: "Products by Category",
      left: "left",
    },

    tooltip: {
      trigger: "axis",
    },

    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },

    grid: {
      left: "5%",
      right: "5%",
      bottom: "15%",
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: chartData.map((item) => item.category),
    },

    yAxis: {
      type: "value",
      name: "Products",
    },

    series: [
      {
        name: "Products",
        type: "bar",
        data: chartData.map((item) => item.total),
        barMaxWidth: 50,
      },
    ],
  };

  return (
    <div
      className="product-chart"
      style={{
        width: "100%",
        minHeight: "400px",
      }}
    >
      {chartData.length === 0 ? (
        <div className="product">
          <h2>Products by Category</h2>
          <p>No product category data available.</p>
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{
            width: "100%",
            height: "400px",
          }}
          opts={{
            renderer: "canvas",
          }}
        />
      )}
    </div>
  );
}