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

    if (props.visualizationType === "histogram") {
        console.log("We will call histogram.js here.");

        return(
            <div className="analysisBlock" style={analysisBlockStyle}>
                <p style = {analysisBlockParagraphStyle}>
                    This should be a histogram!</p>
            </div>
        )

    } else {

        return(
            <div className="analysisBlock" style={analysisBlockStyle}>
                <p style = {analysisBlockParagraphStyle}>
                    Type of this block: {props.visualizationType}</p>
            </div>
        )
    }


}

export default AnalysisBlock