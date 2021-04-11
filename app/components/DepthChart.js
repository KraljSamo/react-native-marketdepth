import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

function makeCumulativeArray(array) {
  return array.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
}

function DepthChart({ asks, bids }) {
  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `green`,
    labelColor: (opacity = 1) => `black`,
  };
  const screenWidth = Dimensions.get("window").width;

  const cumulativeSum = ((sum) => (value) => (sum += value))[0];

  const bidsCumulative = makeCumulativeArray(bids.map((item) => parseFloat(item[1])).reverse()).reverse();
  const asksCumulative = makeCumulativeArray(asks.map((item) => parseFloat(item[1])));

  const chartLabels = bids
    .map((item) => item[0])
    .reverse()
    .concat(asks.map((item) => item[0]));
  const hideLabelsIndices = [...Array(chartLabels.length).keys()].filter((item) => item % 7 !== 0);

  const bidsLine = bidsCumulative.concat(asks.map((item) => 0));
  // const bidsLine = bids.map((item) => item[1]).concat(asks.map((item) => 0));
  const asksLine = bids.map((item) => 0).concat(asksCumulative);
  // const asksLine = bids.map((item) => 0).concat(asks.map((item) => item[1]));

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: bidsLine,
        color: (opacity = 1) => "green",
      },
      {
        data: asksLine,
        color: (opacity = 1) => "red",
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={400}
      yAxisLabel="BTC "
      chartConfig={chartConfig}
      verticalLabelRotation={90}
      withInnerLines={false}
      hidePointsAtIndex={hideLabelsIndices}
    />
  );
}

export default DepthChart;
