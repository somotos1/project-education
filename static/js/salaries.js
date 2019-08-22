//import state_keys from './state_keys.js';

//const abbrevs = Object.values(state_keys);
//const names = Object.keys(state_keys);

var svgWidth = 1200;
var svgHeight = 600;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 75
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import data 
d3.csv("/static/data/teacher_salary_clean.csv", function(error, salaryData) {
    if (error) throw error;

    var parseTime = d3.timeParse("%Y");

    // Format the data

    salaryData.forEach(function(data) {
        data.Year = parseTime(data.Year);
        data.US = +data.US;
        data.AL = +data.AL;
        data.AK = +data.AK;
        data.AZ = +data.AZ;
        data.AR = +data.AR;
        data.CA = +data.CA;
        data.CO = +data.CO;
        data.CT = +data.CT;
        data.DE = +data.DE;
        data.DC = +data.DC;
        data.FL = +data.FL;
        data.GA = +data.GA;
        data.HI = +data.HI;
        data.ID = +data.ID;
        data.IL = +data.IL;
        data.IN = +data.IN;
        data.IA = +data.IA;
        data.KS = +data.KS;
        data.KY = +data.KY;
        data.LA = +data.LA;
        data.ME = +data.ME;
        data.MD = +data.MD;
        data.MA = +data.MA;
        data.MI = +data.MI;
        data.MN = +data.MN;
        data.MS = +data.MS;
        data.MO = +data.MO;
        data.MT = +data.MT;
        data.NE = +data.NE;
        data.NV = +data.NV;
        data.NH = +data.NH;
        data.NJ = +data.NJ;
        data.NM = +data.NM;
        data.NY = +data.NY;
        data.NC = +data.NC;
        data.ND = +data.ND;
        data.OH = +data.OH;
        data.OK = +data.OK;
        data.OR = +data.OR;
        data.PA = +data.PA;
        data.RI = +data.RI;
        data.SC = +data.SC;
        data.SD = +data.SD;
        data.TN = +data.TN;
        data.TX = +data.TX;
        data.UT = +data.UT;
        data.VT = +data.VT;
        data.VA = +data.VA;
        data.WA = +data.WA;
        data.WV = +data.WV;
        data.WI = +data.WI;
        data.WY = +data.WY;
    });

    // Create the scales for the chart

    var xTimeScale = d3.scaleTime()
        .domain(d3.extent(salaryData, data => data.Year))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear().range([height, 0]);

    // Set up the y-axis domain

    let yMax = 0;
    let stateMax = {}
    stateMax['USMax'] = d3.max(salaryData, d => d.US);
    stateMax['ALMax'] = d3.max(salaryData, d => d.AL);
    stateMax['AKMax'] = d3.max(salaryData, d => d.AK);
    stateMax['AZMax'] = d3.max(salaryData, d => d.AZ);
    stateMax['ARMax'] = d3.max(salaryData, d => d.AR);
    stateMax['CAMax'] = d3.max(salaryData, d => d.CA);
    stateMax['COMax'] = d3.max(salaryData, d => d.CO);
    stateMax['CTMax'] = d3.max(salaryData, d => d.CT);
    stateMax['DEMax'] = d3.max(salaryData, d => d.DE);
    stateMax['DCMax'] = d3.max(salaryData, d => d.DC);
    stateMax['FLMax'] = d3.max(salaryData, d => d.FL);
    stateMax['GAMax'] = d3.max(salaryData, d => d.GA);
    stateMax['HIMax'] = d3.max(salaryData, d => d.HI);
    stateMax['IDMax'] = d3.max(salaryData, d => d.ID);
    stateMax['ILMax'] = d3.max(salaryData, d => d.IL);
    stateMax['INMax'] = d3.max(salaryData, d => d.IN);
    stateMax['IAMax'] = d3.max(salaryData, d => d.IA);
    stateMax['KSMax'] = d3.max(salaryData, d => d.KS);
    stateMax['KYMax'] = d3.max(salaryData, d => d.KY);
    stateMax['LAMax'] = d3.max(salaryData, d => d.LA);
    stateMax['MEMax'] = d3.max(salaryData, d => d.ME);
    stateMax['MDMax'] = d3.max(salaryData, d => d.MD);
    stateMax['MAMax'] = d3.max(salaryData, d => d.MA);
    stateMax['MIMax'] = d3.max(salaryData, d => d.MI);
    stateMax['MNMax'] = d3.max(salaryData, d => d.MN);
    stateMax['MSMax'] = d3.max(salaryData, d => d.MS);
    stateMax['MOMax'] = d3.max(salaryData, d => d.MO);
    stateMax['MTMax'] = d3.max(salaryData, d => d.MT);
    stateMax['NEMax'] = d3.max(salaryData, d => d.NE);
    stateMax['NVMax'] = d3.max(salaryData, d => d.NV);
    stateMax['NHMax'] = d3.max(salaryData, d => d.NH);
    stateMax['NJMax'] = d3.max(salaryData, d => d.NJ);
    stateMax['NMMax'] = d3.max(salaryData, d => d.NM);
    stateMax['NYMax'] = d3.max(salaryData, d => d.NY);
    stateMax['NCMax'] = d3.max(salaryData, d => d.NC);
    stateMax['NDMax'] = d3.max(salaryData, d => d.ND);
    stateMax['OHMax'] = d3.max(salaryData, d => d.OH);
    stateMax['OKMax'] = d3.max(salaryData, d => d.OK);
    stateMax['ORMax'] = d3.max(salaryData, d => d.OR);
    stateMax['PAMax'] = d3.max(salaryData, d => d.PA);
    stateMax['RIMax'] = d3.max(salaryData, d => d.RI);
    stateMax['SCMax'] = d3.max(salaryData, d => d.SC);
    stateMax['SDMax'] = d3.max(salaryData, d => d.SD);
    stateMax['TNMax'] = d3.max(salaryData, d => d.TN);
    stateMax['TXMax'] = d3.max(salaryData, d => d.TX);
    stateMax['UTMax'] = d3.max(salaryData, d => d.UT);
    stateMax['VTMax'] = d3.max(salaryData, d => d.VT);
    stateMax['VAMax'] = d3.max(salaryData, d => d.VA);
    stateMax['WAMax'] = d3.max(salaryData, d => d.WA);
    stateMax['WVMax'] = d3.max(salaryData, d => d.WV);
    stateMax['WIMax'] = d3.max(salaryData, d => d.WI);
    stateMax['WYMax'] = d3.max(salaryData, d => d.WY);

    let maxValues = Object.values(stateMax);

    for (const value of maxValues) {
        yMax = yMax > value ? yMax : value;
    };

    yLinearScale.domain([0, yMax]);


    // Create the axes

    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append the axes to the chartGroup

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);

    // Set up line generators and append two SVG paths

    var lineUS = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.US))
        .curve(d3.curveNatural);

    var lineCO = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.CO))
        .curve(d3.curveNatural);

    var lineAZ = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.AZ))
        .curve(d3.curveNatural);

    var lineNC = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.NC))
        .curve(d3.curveNatural);

    var lineGA = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.GA))
        .curve(d3.curveNatural);

    var lineWV = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.WV))
        .curve(d3.curveNatural);

    var lineKY = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.KY))
        .curve(d3.curveNatural);

    var lineOK = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.OK))
        .curve(d3.curveNatural);

    var lineVA = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d.VA))
        .curve(d3.curveNatural);



    // Append a path for each line
    chartGroup
        .append("path")
        .attr("d", lineUS(salaryData))
        .classed("line green", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "green")
        .style("stroke-width", 6);

    chartGroup
        .append("path")
        .attr("d", lineAZ(salaryData))
        .classed("line blue", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "blue")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineNC(salaryData))
        .classed("line purple", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "purple")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineGA(salaryData))
        .classed("line red", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineWV(salaryData))
        .classed("line yellow", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "yellow")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineKY(salaryData))
        .classed("line grey", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "grey")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineCO(salaryData))
        .classed("line orange", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "orange")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineOK(salaryData))
        .classed("line black", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 3);

    chartGroup
        .append("path")
        .attr("d", lineVA(salaryData))
        .classed("line brown", true)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "brown")
        .style("stroke-width", 3);

    chartGroup
        .append("text")
        .attr("transform", `translate(${width /2 }, ${height +20})`)
        .attr("x", -55)
        .attr("y", 20)
        .attr("dx", "1em")
        .style("font-size", "18px")
        .style("font-family", "sans-serif")
        .style("font-decoration", "underline")
        .style("fill", "rgb(49,120,185)")
        .classed("axis-text", true)
        .text("Year");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 1.3))
        .attr("dy", "1em")
        .style("font-size", "18px")
        .style("font-family", "sans-serif")
        .style("font-decoration", "underline")
        .style("fill", "rgb(49,120,185)")
        .classed("axis-text", true)
        .text("Average Salary in USD");

    chartGroup.append("text")
        .attr("y", -25)
        .attr("x", 530)
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
        .style("font-family", "sans-serif")
        .style("font-decoration", "underline")
        .style("fill", "rgb(49,120,185)")
        .style("font-weight", "bold")
        .classed("axis-text", true)
        .text("Average Teacher Salary per State vs US National Average");

});