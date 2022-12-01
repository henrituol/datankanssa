import BarGraph from "./BarGraph";
import PieChart from "./PieChart";

// Import helper function
import { blockBackgroundStyle } from "./utils";

const AnalysisBlock = (props) => {

    let analysisBlockStyle = blockBackgroundStyle ();

    // Conditional rendering depending on the type of visualization.
    // These props come from FetchData.js.
    switch (props.visualizationType) {
        case "bargraph":
            return (
                <div className="analysisBlock" style={analysisBlockStyle}>
                    <BarGraph data = {props.data} name = {props.name} />
                </div>
            )
        case "piechart":
            return (
                <div className="analysisBlock" style={analysisBlockStyle}>
                <PieChart data = {props.data} name = {props.name} />
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