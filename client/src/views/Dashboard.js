import AnalysisBlock from "../components/AnalysisBlock";

const Dashboard = () => {

    // These stylings should probably be done in CSS stylesheet.
    // Otherwise different views may have wildly different looks.
    const headingStyle = {
        fontFamily: "sans-serif",
		fontWeight: "bold",
		padding: 20,
        marginLeft: 20
    }

    const paragraphStyle = {
        fontFamily: "sans-serif",
        marginLeft: 40
    }

    // AnalysisBlock sends a value in props to AnalysisBlock.js
    // whereupon props value is placed on {props.visualizationType}
    // Then again, is Dashboard even the right component to give these values?


    let tempPercentageData = [20, 15, 15, 45, 5];
    let tempHistogramData = [875, 456, 677, 654];

    return(
        <div className =  "mainAnalysis">
            <h2 style = {headingStyle} >Dashboard</h2>
            <p style = {paragraphStyle} >The analysis blocks will show up here.</p>
            <AnalysisBlock visualizationType = "pie chart" data = {tempPercentageData} />
            <AnalysisBlock visualizationType = "histogram" data = {tempHistogramData} />
        </div>

    )
}

export default Dashboard;