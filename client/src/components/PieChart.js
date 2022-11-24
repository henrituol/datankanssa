import React, { useEffect } from "react";
import * as d3 from "d3";

// Import helper function
import { uniqueIdCreator } from "./utils";

// Pie chart code:
// https://d3-graph-gallery.com/graph/pie_basic.html 

function PieChart(props) {

    let uniqueDiv = uniqueIdCreator();

    // useEffect is run after everything else is done.
    // I.e. pie chart div is returned, then d3.js is used to draw graph inside the div.
    useEffect(() => {

        // set the dimensions and margins of the graph
        const width = 250,
            height = 250,
            margin = 10,
            style = "margin-left: 25px";

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select("#" + uniqueDiv)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("style", style)
        .append("g")
            .attr("transform", `translate(${width/2}, ${height/2})`);

        // Create dummy data
        const data = props.data;
        //console.log(data);

        // set the color scale
        const color = d3.scaleOrdinal()
        .range(["#4169e1", "#1e90ff", "#6495ed", "#87ceeb", "#b0c4de"])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
        .value(function(d) {return d[1]})
        const data_ready = pie(Object.entries(data))

        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('slices')
        .data(data_ready)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[1])) })
        .attr("stroke", "white")
        .style("stroke-width", "1px")
        .style("opacity", 0.7)

        /* Names on top of the slices. E.g. group 0, group 1 etc.
        svg.selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function(d){ return "group " + d.data[0]})
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
        .style("text-anchor", "middle")
        .style("font-size", 17)
        */

    }, []);

    return (
        <div className="piechart" id={uniqueDiv}>
            <p>{props.name}</p>
        </div>
    );
}

export default PieChart;