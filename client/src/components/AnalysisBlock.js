import BarGraphWithButton from "./BarGraphWithButton";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";

// This component is called in Dashboard.
// From dashboard we get props: visualizationType and data.
// props.data will be further send to Histogram.js

const AnalysisBlock = (props) => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 5,
        backgroundColor: "#E6E6E3"
    }

    // Conditional rendering depending on the type of visualization.
    if (props.visualizationType === "bargraph") {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
                <BarGraph data = {props.data} name = {"Demonstration bar graph"} />
            </div>
        )
    } else if (props.visualizationType === "piechart") {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
            <PieChart data = {props.data} name = {"Demonstration pie chart"} />
            </div>
        )
    } else {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
                <p>Did you specify a proper type for visualization?</p>
            </div>
        )
    }

}

export default AnalysisBlock