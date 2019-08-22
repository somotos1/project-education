// -------------------------SET SVG AREA AND MARGINS-----------------------------

// SVG wrapper dimensions are determined by the current width and height of the browser window.
var svgWidth = 1200;
var svgHeight = 600;

// Set margins
var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 90
};
// Set chart dimensions
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// ---------------------------CREATE SVG ELEMENT------------------------------

// Create an SVG wrapper, append an SVG group that will hold our chart
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// ---------------------------LEGEND HIGHLIGHT FUNCTION---------------------------//

// What to do when one group is hovered
var highlight = function (d) {
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // except the one that is hovered
    d3.selectAll("." + d.replace(/\s+/g,"")).style("opacity", 1)
    // d3.selectAll(".bubblesUs").style("opacity", 1)
    console.log(d)
}

// And when it is not hovered anymore
var noHighlight = function (d) {
    d3.selectAll(".bubbles").style("opacity", 1)
}
// Append an SVG group and shift the latter by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`).on("click", noHighlight);

// --------------------ENABLE DIFFERENT Y AXIS FUNCTIONALITY--------------------

// Set the initial params for chosen Y Axis
var chosenYAxis = "AverageMathScore";

// function used for updating y-scale var and values upon click on axis label
function yScale(scoresData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.max(scoresData, d => d[chosenYAxis]+2), d3.min(scoresData, d => d[chosenYAxis]-2)])
        .range([0, height]);

    return yLinearScale;

}
// function used for updating yAxis var upon click on axis label
function renderAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
}
// ---------------------------TOOLTIP---------------------------------

// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circlesGroup) {

    if (chosenYAxis === "AverageMathScore") {
        var label = "Average Math Score:";
    }
    else {
        var label = "$ per Student:";
    }
// -------------------------CREATE TOOLTIP-----------------------------
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        // .offset([80, -60])
        .html(function (d) {
            return (`<strong>${d.State}</strong><hr>${label} ${d[chosenYAxis].toFixed(2)}`);
        });
        // return (`${d.State}<br>${label} ${d[chosenYAxis]}<br>$/Student: ${d.DollarsPerStudent}`);
    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}
// ---------------------------READ IN DATA---------------------------------

// Retrieve data from the CSV file and execute everything below
d3.csv("static/data/scores_and_funding.csv", function (err, scoresData) {
    if (err) throw err;

    // create date parser
    var dateParser = d3.timeParse("%Y");

    // parse data
    scoresData.forEach(function (data) {
        data.AverageMathScore = +data.AverageMathScore;
        data.AverageReadingScore = +data.AverageReadingScore;
        data.TotalFunding = +data.TotalFunding;
        data.DollarsPerStudent = +data.DollarsPerStudent;
        data.StudentsEnrolled = +data.StudentsEnrolled;
        data.Year = dateParser(data.Year);
    });

// ---------------------------PLOT AXES---------------------------------  
    // yLinearScale function above csv import
    var yLinearScale = yScale(scoresData, chosenYAxis);

    // Create x scale function
    var xLinearScale = d3.scaleTime()
        .domain([d3.max(scoresData, d => d.Year), d3.min(scoresData, d => d.Year)/1.05])
        .range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);

    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis.ticks(16))
        .style("font","sans-serif");

    var ticks = d3.selectAll(".tick text");
    ticks.attr("class", function(d,i){
    if(i%2 != 0) d3.select(this).remove();
    });

    // append y axis
    var yAxis = chartGroup.append("g")
        .call(leftAxis)


// --------------------------ADD CIRCLES-------------------------------

    // Add a color scale
    // var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    var myColor = d3.scaleOrdinal().domain(scoresData).range(["#1B4F72", "#1A237E", "#2E86C1", "#34495E", "#5DADE2", "#A569BD", "#76D7C4", "#D2B4DE"])
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(scoresData)
        .enter()
        .append("circle")
        .attr("class", function (d) { if (d.State === "US")
            {return "bubblesUs " + d.State}
            else {return "bubbles " + d.State.replace(/\s+/g,"")}})
        .attr("cx", d => xLinearScale(d.Year))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 10)
        .attr("fill", d => (d.State === "US") ? "white" : myColor(d.State))
        .attr("stroke","black")
        .attr("opacity", ".8");
        // .attr("r", d => d.DollarsPerStudent *1.3)
        
    // Add the connecting lines
    var line = d3.line()
      .x(function(d) { return x(d.Year) })
      .y(function(d) { return y(d[chosenYAxis]) })
    chartGroup.selectAll("myLines")
      .data(scoresData)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d[chosenYAxis]) } )
        .attr("stroke", function(d){ return myColor(d.State) })
        .style("stroke-width", 4)
        .style("fill", "none")

// ------------------------ADD CHART TITLE-------------------------

        chartGroup.append("text")
        .attr("x", (width / 2-150))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "28px")
        .style("font-family","sans-serif") 
        .style("text-decoration", "underline")  
        .style("fill", "#3178b9")
        .text("Test Scores vs $/Student: Protest States vs US National Average");


    // -------------------------ADD LEGEND: STATES-----------------------------

    // Add one circle in the legend for each name.
    var size = 20
    var allGroups = ["Arizona", "North Carolina", "South Carolina", "West Virginia", "Kentucky", "Colorado", "Oklahoma", "Virginia","US"]
    svg.selectAll("myrect")
        .data(allGroups)
        .enter()
        .append("circle")
        .attr("cx", 700)
        .attr("cy", function (d, i) { return 150 + i * (size + 10) }) // 100 is where the first circle appears. 10 is the distance between dots
        .attr("r", 7)
        .attr("stroke","black")
        .style("fill", d => (d === "US") ? "white" : myColor(d))
        .on("mouseover", highlight)
        .on("click", noHighlight);

        // .on("mouseleave", noHighlight);

    // Add labels beside legend circles
    svg.selectAll("mylabels")
        .data(allGroups)
        .enter()
        .append("text")
        .attr("x", 700 + size * .8)
        .attr("y", function (d, i) { return 150 + i * (size + 10) }) // 100 is where the first label appears. 10 is the distance between labels
        .style("fill", d => (d === "US") ? "black" : myColor(d))
        .text(function (d) { return d })
        .attr("text-anchor", "left")
        .style("font-family","sans-serif")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("click", noHighlight);
        // .on("mouseleave", noHighlight);

// ----------------------------SET UP LABELS FOR  2 Y AXES--------------------------------

    // Create group for  2 y- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var mathLabel = labelsGroup.append("text")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 + margin.right - 100)
        .attr("value", "AverageMathScore") // value to grab for event listener
        .classed("active", true)
        .style("font-family","sans-serif")
        .text("Average Math Score");

    var fundingLabel = labelsGroup.append("text")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 + margin.right - 120)
        .attr("value", "DollarsPerStudent") // value to grab for event listener
        .classed("inactive", true)
        .style("font-family","sans-serif")
        .text("Dollars Per Student");

    // append x axis label
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2 - 190}, ${height + 25})`)
        .attr("y", 0)
        .attr("x", 0)
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Year");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

    // y axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenYAxis with value
                chosenYAxis = value;

                console.log(chosenYAxis)

                // functions here found above csv import
                // updates y scale for new data
                yLinearScale = yScale(scoresData, chosenYAxis);

                // updates y axis with transition
                yAxis = renderAxes(yLinearScale,yAxis);

                // updates circles with new y values
                circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenYAxis === "DollarsPerStudent") {
                    fundingLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    mathLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    fundingLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    mathLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });
});