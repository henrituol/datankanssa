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

    return(
		<div class="analysisBlock" style={analysisBlockStyle}>
            <p style = {analysisBlockParagraphStyle}>
                Type of this block: {props.visualizationType}</p>
		</div>
	)
}

export default AnalysisBlock