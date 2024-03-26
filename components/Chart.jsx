import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import indicators from "highcharts/indicators/indicators";
import vbp from "highcharts/indicators/volume-by-price";

indicators(Highcharts);
vbp(Highcharts);

export default function Chart({ data, ticker = "AAPL" }) {
  const seriesData = data.map((item) => [item.t, item.o, item.h, item.l, item.c]);
  const volumeData = data.map((item) => [item.t, item.v]);
  const groupingUnits = [
    ["week", [1]],
    ["month", [1, 2, 3, 4, 6]],
  ];
  const options = {
    chart: {
      height: 600,
      width: null,
    },
    navigator: {
      enabled: true,
    },
    scrollbar: {
      enabled: true,
    },
    rangeSelector: {
      enabled: true,
      inputEnabled: true,
      selected: 2,
    },

    title: {
      text: `${ticker} Historical`,
    },
    subtitle: {
      text: "With SMA and Volume by Price technical indicators",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        startOnTick: false,
        endOnTick: false,
        opposite: true,
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        opposite: true,
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      split: true,
    },
    series: [
      {
        type: "candlestick",
        name: "AAPL",
        id: "aapl",
        zIndex: 2,
        data: seriesData,
      },
      {
        type: "column",
        name: "Volume",
        id: "volume",
        data: volumeData,
        yAxis: 1,
      },
      {
        type: "vbp",
        linkedTo: "aapl",
        params: {
          volumeSeriesID: "volume",
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: "sma",
        linkedTo: "aapl",
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: true,
          groupPixelWidth: 10,
        },
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
