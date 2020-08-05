// import * as d3 from "d3";

// set the dimensions and margins of the graph
var margin = {
    top: 10,
    right: 30,
    bottom: 90,
    left: 40
  },
  width = 230 - margin.left - margin.right,
  height = 440 - margin.top - margin.bottom;

  var color = d3.scaleLinear().domain([1,10]).range(["green", "red"]);
// append the svg object to the body of the page
export let studends_bar_chart_svg = d3.select("#students_bar_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// /**
//  * recreate the student bar chart after update the active question
//  */
// export let recreate_students_barchart = function () {
//   $("#students_bar_chart").empty();
//   questions_bar_chart_svg = d3.select("#students_bar_chart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")");
// }

/**
 * draw the bar chart based on the svg created by the d3
 * @param {*} questions_bar_chart_svg 
 * @param {*} data 
 */
export let draw_h_bar_chart = function (questions_bar_chart_svg ,data) {
  // X axis
  var y = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) {
      return d.Answer;
    }))
    .padding(0.2);

  // Add Y axis
  var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([0, width]);

//   questions_bar_chart_svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

  questions_bar_chart_svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  questions_bar_chart_svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return y(d.Answer);
    })
    .attr("height", y.bandwidth())
    .attr("fill", function(d, i) {
        return color(i);
      })
    .attr("x", 0)
    // no bar at the beginning thus:
    .attr("width", function (d) {
      return x(0);
    }) // always equal to 0


  questions_bar_chart_svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("x", 0)
    .attr("width", function (d) {
      return x(d.Value);
    })
    .delay(function (d, i) {
      // console.log(i);
      return (i * 100)
    })

}


/**
 * Update the bar chart based on the svg and the new data with animation
 * @param {*} questions_bar_chart_svg 
 * @param {*} data 
 */
export let update_h_bar_chart = function (questions_bar_chart_svg ,data) {
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 13000])
    .range([height, 0]);

  // Animation
  questions_bar_chart_svg.selectAll("rect")
    .data(data)
    .transition()
    .duration(800)
    .attr("x", 0)
    .attr("width", function (d) {
      return x(d.Value);
    })
    .delay(function (d, i) {
      // console.log(i);
      return (i * 100)
    })
}
