import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export default function TrendsChart({ trends }) {
  const options = {
    chart: {
      type: "column",
      backgroundColor: "#f3f3f3",
    },
    title: {
      text: "Recommendation Trends",
      align: "center",
    },
    xAxis: {
      categories: trends.map((item) => item.period),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Analysis",
      },
      gridLineColor: "#c3c1c1",
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "number",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Strong Buy",
        data: trends.map((item) => item.strongBuy),
        color: "green",
      },
      {
        name: "Buy",
        data: trends.map((item) => item.buy),
        color: "#28b804",
      },
      {
        name: "Hold",
        data: trends.map((item) => item.hold),
        color: "#edb231",
      },
      {
        name: "Sell",
        data: trends.map((item) => item.sell),
        color: "orange",
      },
      {
        name: "Strong Sell",
        data: trends.map((item) => item.strongSell),
        color: "red",
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
