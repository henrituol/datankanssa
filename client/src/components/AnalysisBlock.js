import Histogram from "./Histogram";

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
    if (props.visualizationType === "histogram") {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
                <Histogram data = {props.data} />
            </div>
        )
    } else {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
                <p>
                    Type of this block: {props.visualizationType}</p>
                <p>
                Data of this block: {props.data}</p>
            </div>
        )
    }

}

export default AnalysisBlock