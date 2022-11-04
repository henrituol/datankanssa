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
    // whereuopn props value is placed on {props.visualizationType}
    return(
        <div className =  "mainAnalysis">
            <h2 style = {headingStyle} >Dashboard</h2>
            <p style = {paragraphStyle} >The analysis blocks will show up here.</p>
            <AnalysisBlock visualizationType = "pie chart" />
            <AnalysisBlock visualizationType = "histogram" />
        </div>

    )
}

export default Dashboard;