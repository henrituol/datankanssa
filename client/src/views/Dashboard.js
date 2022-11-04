import AnalysisBlock from "../components/AnalysisBlock";

const Dashboard = (props) => {

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

    return(
        <div class =  "mainAnalysis">
            <h2 style = {headingStyle} >Dashboard</h2>
            <p style = {paragraphStyle} >The analysis blocks will show up here.</p>
            <AnalysisBlock />
            <AnalysisBlock />
        </div>

    )
}

export default Dashboard;