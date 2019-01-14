// Step 1: Set up our chart

function buildcharts() {

var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 60,
  bottom: 60,
  left: 70
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var x = d3.scaleTime().range([0, width]);
//var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

 // gridlines in x axis function
function make_x_gridlines() {		
  return d3.axisBottom(x)
      .ticks(11)
}

// gridlines in y axis function
function make_y_gridlines() {		
  return d3.axisLeft(y)
      .ticks(10)
}

 // Step 3:
// Import data from the domestic_movie_data.csv file
// =================================
//Use when not using flask
d3.csv("../../db/csv/domestic_movie_data.csv", function(error, movieData) {
  if (error) throw error;

  //console.log(movieData);
  //console.log([movieData]);

  // Step 4: Parse the data
  
  // =================================
 
 var parseTime = d3.timeParse("%Y");


  // Format the data
  movieData.forEach(function(data) {
    data.year = parseTime(data.year);
    data.year = +data.year;
    data.tickets_sold = +data.tickets_sold;
    data.total_revenue = +data.total_revenue;
  });

  // Step 5: Create Scales
  //= ============================================
  var xTimeScale = d3.scaleTime()
  //var xTimeScale = d3.scaleTime()
    .domain(d3.extent(movieData, d => d.year))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(movieData, d => d.tickets_sold)+500])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(movieData, d => d.total_revenue)+4])
    .range([height, 0]);

  // Step 6: Create Axes
  // =============================================
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

 

  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

   // Add rightAxis to the right side of the display
  chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(leftAxis);

 


  // Step 8: Set up two line generators and append two SVG paths
  // ==============================================
  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d.tickets_sold));


//d3.select("#start").on("click", function() {
  
d3.select("#start").on("click", function() { 

  var animate = chartGroup.append("path")
    .data([movieData])
    .attr("d", line1)
    .classed("line purple", true); 

  var totalLength = animate.node().getTotalLength();

    // Set Properties of Dash Array and Dash Offset and initiate Transition
  animate
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition() // Call Transition Method
    .duration(15000) // Set Duration timing (ms)
    .ease(d3.easeLinear) // Set Easing option
    .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

  var line2 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d.total_revenue));

  // Append a path for line2
  var anime = chartGroup.append("path")
    .data([movieData])
    .attr("d", line2)
    .classed("line green", true);

 // Variable to Hold Total Length
  var totalLength2 = anime.node().getTotalLength();

// Set Properties of Dash Array and Dash Offset and initiate Transition
anime
	.attr("stroke-dasharray", totalLength2 + " " + totalLength2)
	.attr("stroke-dashoffset", totalLength2)
  .transition() // Call Transition Method
	.duration(15000) // Set Duration timing (ms)
	.ease(d3.easeLinear) // Set Easing option
  .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

});
// Reset Animation

d3.select("#reset").on("click", function() {
	d3.select(".line").remove();
});

  // Create axes labels
  
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.right + 900)
  .attr("x", 0 - (height / 2))
  .attr("dy", "2em")
  .attr("class", "axisText2")
  .text("Domestic Revenue (in Billions of $ US)");

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left )
  .attr("x", 0 - (height / 2))
  .attr("dy", "2em")
  .attr("class", "axisText1")
  .text("Domestic Ticket Sales (in Millions of $ US)");

  
chartGroup.append("text")
  .attr("transform", `translate(${width / 2.0}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Movie Ticket Sales and Industry Revenue Data 2002-2017");



chartGroup.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0,"+ height +")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
          
          
      )

  // add the Y gridlines
chartGroup.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
          
      )
  });

}
buildcharts();
