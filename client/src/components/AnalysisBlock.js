import Histogram from "./Histogram";

// This component is called in Dashboard.
// From dashboard we get props: visualizationType and data.
// props.data will be further send to Histogram.js

const AnalysisBlock = (props) => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 40,
        backgroundColor: "#E6E6E3"
    }

    let analysisBlockParagraphStyle = {
        padding: 5,
        margin: 5
    }



    // Conditional rendering depending on the type of visualization.
    if (props.visualizationType === "histogram") {
        return (
            <Histogram data = {props.data} />
        )
    } else {
        return (
            <div className="analysisBlock" style={analysisBlockStyle}>
                <p style = {analysisBlockParagraphStyle}>
                    Type of this block: {props.visualizationType}</p>
                <p style = {analysisBlockParagraphStyle}>
                Data of this block: {props.data}</p>
            </div>
        )
    }

}

export default AnalysisBlock