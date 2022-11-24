import BarGraph from "./BarGraph";
import PieChart from "./PieChart";

const AnalysisBlock = (props) => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 5,
        backgroundColor: "#E6E6E3"
    }

    // Conditional rendering depending on the type of visualization.
    switch (props.visualizationType) {
        case "bargraph":
            return (
                <div className="analysisBlock" style={analysisBlockStyle}>
                    <BarGraph data = {props.data} name = {"Demonstration bar graph"} />
                </div>
            )
        case "piechart":
            return (
                <div className="analysisBlock" style={analysisBlockStyle}>
                <PieChart data = {props.data} name = {"Demonstration pie chart"} />
                </div>
            )
        default:
            return (
                <div className="analysisBlock" style={analysisBlockStyle}>
                    <p>Did you specify a proper type for visualization?</p>
                </div>
            )
    }
}

export default AnalysisBlock