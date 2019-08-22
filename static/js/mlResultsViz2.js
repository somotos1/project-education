console.log(data.PredictedAvgScore18_19);
// Trace for the Predicted Data
var trace1 = {
  x: data.map(row => row.State),
  y: data.map(row => row.PredictedAvgScore18_19.toFixed(2)),
  text: data.map(row => row.State),
  name: "Predicted Average Math Score",
  type: "bar",
  marker:{color: "#1380EC"}
};

var data = [trace1];

// Apply the group barmode to the layout
var layout = {
  title: "2019 Predicted Average Math Scores",
  xaxis: {
    tickangle: -45
  },
  yaxis: {range: [260, 310]}
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("chart", data, layout);