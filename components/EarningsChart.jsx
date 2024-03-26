import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export default function EarningsChart({ earnings }) {
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#f3f3f3",
    },
    title: {
      text: "Historical EPS Surprises",
    },
    xAxis: {
      categories: earnings.map((item) => {
        return `${item.period} \n Surprise: ${item.surprise}`;
      }),
    },
    yAxis: {
      title: {
        text: "Quarterly EPS",
      },
      gridLineColor: "#c3c1c1",
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        name: "Actual",
        marker: {
          symbol: "circle",
          lineWidth: 0,
        },
        data: earnings.map((item) => {
          return item.actual;
        }),
      },
      {
        name: "Estimate",
        marker: {
          symbol: "diamond",
        },
        data: earnings.map((item) => {
          return item.estimate;
        }),
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
