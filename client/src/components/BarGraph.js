import * as d3 from "d3";

function BarGraph(props) {

    // set the dimensions and margins of the graph
    const margin = {top: 5, right: 30, bottom: 30, left: 40},
    width = 270 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

    // Depending on whether the button has been clicked or not, show or hide the bargraph.
    let bargraphIsHidden = true;
    const activateD3 = () => {
        if (bargraphIsHidden === true) {
            bargraphIsHidden = false;

            // Add the svg object to the bargraph div.
            const svg = d3.select(".bargraph")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("id", "bargraphAsSVG")
                .append("g")
                    .attr("transform",
                    `translate(${margin.left},${margin.top})`);


            // X axis: scale and draw:
            const xAxis = d3.scaleLinear()
                .domain([0, 6]) // These hard-coded values ought to be changed.
                .range([0, (width*0.9)]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                //.call(d3.axisBottom(xAxis).ticks(5)); // Without ticks(), bargraph would show 1.5, 2.5 etc.
                    // Apparently, d3.js ticks() also does something funky where it tries to force number of ticks depending on the... domain? Data?
                    // How about specifying ticks manually?
                .call(d3.axisBottom(xAxis).ticks(5).tickValues([1, 2, 3, 4, 5]));


            // set the parameters for the bargraph
            const bargraph = d3.bin()
                .thresholds(5); // Number of bins

            // And apply this function to data to get the bins
            const bins = bargraph(props.data);
            console.log(bins);

            // Y axis: scale and draw:
            const yAxis = d3.scaleLinear()
                .range([height, 0])
                .domain([0, 4]); // These hard-coded values ought to be changed.
            svg.append("g")
                .call(d3.axisLeft(yAxis).ticks(4));

            // Add the bar rectangles to the svg element
            svg.selectAll("rect")
                .data(bins)
                .join("rect")
                    .attr("x", -13) // X pixels left/right related to the tick. N.B. xAxis.domain changes the width.
                .attr("transform", function(d) { return `translate(${xAxis(d.x0)} , ${yAxis(d.length)})`})
                    .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) -1})
                    .attr("height", function(d) { return height - yAxis(d.length); })
                    .style("fill", "#45b6fe");

        } else {
            d3.selectAll("#bargraphText").style("color", "black");
            d3.select("#helloId").remove("p");
            d3.select("#histrogramAsSVG").remove("svg");
            
            bargraphIsHidden = true;
        }
    }

    return (
        <div className="bargraph">
            <button onClick={activateD3}>Show/hide bar graph</button>
            <p></p>
        </div>
    );

}

export default BarGraph;