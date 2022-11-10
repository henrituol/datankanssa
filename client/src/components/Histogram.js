import * as d3 from "d3";

function Histogram(props) {
    console.log(props);

    let i = 0;
    const activateD3 = () => {
        if (i === 0) {
            d3.selectAll("#histogramText").style("color", "blue");
            d3.select(".histogram").append("p").attr("id", "helloId").text("Hello!");
            i = 1;

        } else {
            d3.selectAll("#histogramText").style("color", "black");
            d3.select("#helloId").remove("p")
            i = 0;
        }
    }

    return (
        <div className="histogram">
            <button onClick={activateD3}>Change view with d3.js</button>
            <p id="histogramText">
                {props.data}
            </p>
        </div>
    );

}

export default Histogram;