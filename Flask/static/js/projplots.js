function init() {
  data = [{
    x: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
    y: [22, 27, 33, 39, 45, 49, 55] }];
  var LINE = document.getElementById("plot");
  var layout = {
    title: {
      text: "US Netflix Streaming Subscriptions",
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
    },
    xaxis: {
    title: {
      text: 'Year',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
  },
  yaxis: {
    title: {
      text: 'Number of Subscritions (in millions)',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
  }

  Plotly.plot(LINE, data, layout);
}

function updatePlotly(newx, newy,newTitle,newYLabel) {
  var LINE = document.getElementById("plot");

  // Note the extra brackets around 'newx' and 'newy'
  Plotly.restyle(LINE, "x", [newx]);
  Plotly.restyle(LINE, "y", [newy]);
  Plotly.relayout(LINE, "title.text", newTitle);
  Plotly.relayout(LINE, "yaxis.title.text", newYLabel);
}
//console.log(layout.yaxis.title.text);

function getData(dataset) {

  // Initialize empty arrays to contain our axes
  var x = [];
  var y = [];
  var title = "";
  var ylabel = "";

  // Fill the x and y arrays as a function of the selected dataset
  switch (dataset) {
  case "dataset1":
    x = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    y = [22, 27, 33, 39, 45, 49, 55];
    title = "US Netflix Streaming Subscriptions";
    ylabel = "Number of Subscritions (in millions)";
    break;
  case "dataset2":
    x = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    y = [11.17, 8.22, 6.93, 5.77, 4.9, 4.11, 3.38];
    title = "US Netflix DVD Subscriptions";
    ylabel = "Number of DVD Subscriptions (in millions)";
    break;
  case "dataset3":
    x = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    y = [3205, 3609, 4375, 5505, 6780, 8831, 11693];
    title = "US Netflix Revenue Per Year";
    ylabel = "Revenue (in millions)";
    break;
  default:
    x = [1, 2, 3, 4, 5, 6, 7];
    y = [1, 2, 3, 4, 5, 6, 7];
    title = "US Netflix Streaming Subscriptions";
    ylabel = "Number of Subscritions (in millions)";
    break;
  }

  updatePlotly(x, y,title,ylabel);
}

init();


