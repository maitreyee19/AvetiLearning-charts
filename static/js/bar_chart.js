// import * as d3 from "d3";

// set the dimensions and margins of the graph
var margin = {
    top: 10,
    right: 30,
    bottom: 90,
    left: 40
  },
  width = 330 - margin.left - margin.right,
  height = 330 - margin.top - margin.bottom;

var color = d3.scaleLinear().domain([0, 1]).range(["green", "red"]);
// append the svg object to the body of the questions_bar_chart
export let questions_bar_chart_svg = d3.select("#questions_bar_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

/**
 * recreate the question bar chart after update the active question
 */
export let recreate_questions_barchart = function () {
  $("#questions_bar_chart").empty();
  questions_bar_chart_svg = d3.select("#questions_bar_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
}


/**
 * draw the bar chart based on the svg created by the d3
 * @param {*} questions_bar_chart_svg 
 * @param {*} data 
 */
export let drawBarChart = function (questions_bar_chart_svg, data) {
  // X axis
  var x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) {
      return d.Answer;
    }))
    .padding(0.2);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);

  questions_bar_chart_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("font-size", "20px")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  questions_bar_chart_svg.append("g")
    .attr("class", "yaxis")
    .call(d3.axisLeft(y));

  // Bars
  questions_bar_chart_svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.Answer);
    })
    .attr("width", x.bandwidth())
    .attr("fill", function (d, i) {
      return color(i);
    })
    // no bar at the beginning thus:
    .attr("height", function (d) {
      return height - y(0);
    }) // always equal to 0
    .attr("y", function (d) {
      return y(0);
    })

  questions_bar_chart_svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y(d.Value);
    })
    .attr("height", function (d) {
      return height - y(d.Value);
    })
    .delay(function (d, i) {
      return (i * 100)
    })

}


// /**
//  * Update the bar chart based on the svg and the new data with animation
//  * @param {*} questions_bar_chart_svg 
//  * @param {*} data 
//  */
// export let update_bar_chart = function (questions_bar_chart_svg, data) {
//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([0, 10])
//     .range([height, 0]);

//   // Animation
//   questions_bar_chart_svg.selectAll("rect")
//     .data(data)
//     .transition()
//     .duration(800)
//     .attr("y", function (d) {
//       return y(d.Value);
//     })
//     .attr("height", function (d) {
//       return height - y(d.Value);
//     })
//     .delay(function (d, i) {
//       console.log(i);
//       return (i * 100)
//     })
// }


/**
 * Update the bar chart based on the svg and the new data with animation
 * @param {*} questions_bar_chart_svg 
 * @param {*} data 
 */
export let update_bar_chart_label = function (questions_bar_chart_svg, data) {
  var max = 0;
  for (var idata = 0; idata < data.length; idata++) {
    if (data[idata].Value > max) max = data[idata].Value;
  }
  var maxHeight = ((max / 10) + 1) * 10;
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, maxHeight])
    .range([height, 0]);

  questions_bar_chart_svg.select(".yaxis")
    .transition().duration(800)
    .call(d3.axisLeft(y));

  // Animation
  questions_bar_chart_svg.selectAll("rect")
    .data(data)
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y(d.Value);
    })
    .attr("height", function (d) {
      return height - y(d.Value);
    })
    .delay(function (d, i) {
      // console.log(i);
      return (i * 100)
    })
}