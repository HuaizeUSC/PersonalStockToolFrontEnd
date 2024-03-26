import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

export default function HourlyCharts({ data, ticker, up = true }) {
  const seriesData = data.map((item) => [item.t, item.c]);
  const options = {
    chart: {
      backgroundColor: "#e9e9e9",
    },
    title: {
      text: `${ticker} Hourly Price Variation`,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      gridLineColor: "#c3c1c1",
    },
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    series: [
      {
        name: "Stock Price",
        data: seriesData,
        color: up ? "green" : "red",
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
    </div>
  );
}
