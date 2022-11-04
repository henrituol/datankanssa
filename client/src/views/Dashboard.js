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
    // Then again, is Dashboard even the right component to give this values?

    // I'd like to try to pass multiple props to AnalysisBlock.
    // How was it done?
    const analysisElement = {
        type: "text",
        props: {
            visualizationType: "histogram",
            data: "cool values"
        }
    }

    return(
        <div className =  "mainAnalysis">
            <h2 style = {headingStyle} >Dashboard</h2>
            <p style = {paragraphStyle} >The analysis blocks will show up here.</p>
            <AnalysisBlock visualizationType = "pie chart" />
            <AnalysisBlock data = "klaatu" />
            <AnalysisBlock />
        </div>

    )
}

export default Dashboard;