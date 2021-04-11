import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

function makeCumulativeArray(array) {
  // Transforms an array of numbers into an array of cumulative sums
  // For example: [2, 3, 5] => [2, 5, 10]
  return array.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
}

function DepthChart({ asks, bids }) {
  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: () => `green`,
    labelColor: () => `black`,
  };
  const screenWidth = Dimensions.get("window").width;

  // Bids are given in descending order (from higher price to lower)
  // If we want to create a nice depth chart, we should make a cumulative sum from higher prices to lower ones (for bids only)
  // Therefore we first reverse the array, apply the cumulative sum and then reverse the array back.
  const bidsCumulative = makeCumulativeArray(bids.map((item) => parseFloat(item[1])).reverse()).reverse();
  const asksCumulative = makeCumulativeArray(asks.map((item) => parseFloat(item[1])));

  // Our labels are all bid prices aswell as all ask prices
  const chartLabels = bids
    .map((item) => item[0])
    .reverse()
    .concat(asks.map((item) => item[0]));

  // We need to manually remove some labels, otherways everything seems too crowded.
  // With 200 label points, printing every 11th one seems okay.
  const hideLabelsIndices = [...Array(chartLabels.length).keys()].filter((item) => item % 11 !== 0);

  // We will create our depth chart with 2 line charts. One will represent bids and the other asks.
  // Logically, those 2 lines can never intersect otherways a trade would have already occured.
  // Below we map those lines to 0 at points where they dont exist.
  const bidsLine = bidsCumulative.concat(asks.map((item) => 0));
  const asksLine = bids.map((item) => 0).concat(asksCumulative);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: bidsLine,
        color: () => "green",
      },
      {
        data: asksLine,
        color: () => "red",
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={300}
      yAxisLabel="BTC "
      chartConfig={chartConfig}
      verticalLabelRotation={45}
      withInnerLines={false}
      hidePointsAtIndex={hideLabelsIndices}
    />
  );
}

export default DepthChart;
