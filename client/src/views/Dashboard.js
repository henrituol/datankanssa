import AnalysisBlock from "../components/AnalysisBlock";

const Dashboard = () => {

    // AnalysisBlock sends a value in props to AnalysisBlock.js
    // whereupon props value is placed on {props.visualizationType}
    // Then again, is Dashboard even the right component to give these values?

    let tempPercentageData = [20, 15, 15, 45, 5];
    // Dummy data. Could be, e.g., customer satisfaction reviews on likert scale.
    let tempBarGraphData = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 5];

    return(
        <div className =  "mainAnalysis">
            <h2>Dashboard</h2>
            <p>The analysis blocks will show up here.</p>
            <AnalysisBlock visualizationType = "pie chart" data = {tempPercentageData} />
            <AnalysisBlock visualizationType = "bargraph" data = {tempBarGraphData} />
        </div>

    )
}

export default Dashboard;