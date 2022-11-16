import React, { useEffect } from "react";
import * as d3 from "d3";

// Starting point for histogram:
// https://d3-graph-gallery.com/graph/histogram_basic.html

function BarGraph(props) {

    // Create a unique ID for a div, so that d3js visualization can be matched with the proper container.
    let divId = Math.floor(Math.random() * 99999);
    // Let's make sure the ID is unique.
    if (document.getElementById(divId) !== null) {
        while (document.getElementById(divId) !== null) {
            divId = Math.floor(Math.random() * 99999);
        }
    }
    let uniqueDiv = "Id" + divId;

    // useEffect is run after everything else is done.
    // I.e. baragraph div is returned, then d3.js is used to draw graph inside the div.
    useEffect(() => {

        // set the dimensions and margins of the graph
        const margin = {top: 5, right: 30, bottom: 30, left: 40},
        width = 270 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

        // Add the svg object to the div with unique idea placed in return.
        const svg = d3.select("#" + uniqueDiv)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "bargraphAsSVG")
            .append("g")
                .attr("transform",
                `translate(${margin.left},${margin.top})`);

        // X axis
        const xAxis = d3.scaleLinear()
            .domain([0, 6]) // These hard-coded values ought to be changed.
            .range([0, (width*0.9)]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            //.call(d3.axisBottom(xAxis).ticks(5)); // Without ticks(), bargraph would show 1.5, 2.5 etc.
                // Apparently, d3.js ticks() also does something funky where it tries to force number of ticks depending on the... domain? Data?
                // How about specifying ticks manually?
            .call(d3.axisBottom(xAxis).ticks(5).tickValues([1, 2, 3, 4, 5]));
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 30)
            .text("Customer satisfaction");

        // set the parameters for the bargraph
        const bargraph = d3.bin()
            .thresholds(5); // Number of bins

        // And apply this function to data to get the bins
        const bins = bargraph(props.data);

        // Y axis
        const yAxis = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 4]); // These hard-coded values ought to be changed.
        svg.append("g")
            .call(d3.axisLeft(yAxis).ticks(4));


        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -20)
            .attr("y", 5)
            .text("n");

        // Add the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(bins)
            .join("rect")
                .attr("x", -13) // X pixels left/right related to the tick. N.B. xAxis.domain changes the width!
            .attr("transform", function(d) { return `translate(${xAxis(d.x0)} , ${yAxis(d.length)})`})
                .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) -1})
                .attr("height", function(d) { return height - yAxis(d.length); })
                .style("fill", "#45b6fe");
    }, []);

    return (
        <div className="bargraph" id={uniqueDiv}>
            <p>{props.name}</p>
        </div>
    );
}

export default BarGraph;