import AnalysisBlock from "../components/AnalysisBlock";
import EmptyBlock from "../components/EmptyBlock";

const Dashboard = () => {

    // AnalysisBlock sends a value in props to AnalysisBlock.js
    // whereupon props value is placed on {props.visualizationType}
    // Then again, is Dashboard even the right component to give these values?

    return(
        <div className =  "mainAnalysis">
            <h2>Dashboard</h2>
            <EmptyBlock />
        </div>

    )
}

export default Dashboard;