import AnalysisBlock from "../components/AnalysisBlock";

const Dashboard = () => {

    // AnalysisBlock sends a value in props to AnalysisBlock.js
    // whereupon props value is placed on {props.visualizationType}
    // Then again, is Dashboard even the right component to give these values?

    let tempPercentageData = [20, 15, 15, 45, 5];
    let tempHistogramData = [875, 456, 677, 654];

    return(
        <div className =  "mainAnalysis">
            <h2>Dashboard</h2>
            <p>The analysis blocks will show up here.</p>
            <AnalysisBlock visualizationType = "pie chart" data = {tempPercentageData} />
            <AnalysisBlock visualizationType = "histogram" data = {tempHistogramData} />
        </div>

    )
}

export default Dashboard;