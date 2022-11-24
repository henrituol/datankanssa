import { useState } from "react";
import AnalysisBlock from "./AnalysisBlock"

// Import helper function
import { blockBackgroundStyle } from "./utils";

// When a button is pushed, a new view should appear.
// In the new view, you can select the type of visualization and data.
// However, in this first version: click +-button and render something with dummy data.


// Is it bad to have to components in one file even though they work together?
// Also, this is just a helper component not to be used from anywhere else.

// First, create an empty block.
const EmptyBlock = () => {

    let analysisBlockStyle = blockBackgroundStyle ();

    const [show, setShow] = useState(false);
    
    return (
        <>
            <div className="EmptyBlock" style={analysisBlockStyle}>
                <p>Press + to add an analysis view.</p>
                <button onClick={() => setShow(true)}>+</button>
            </div>
            {show && <ShowOptions />}
        </>

    )
}

// Second, when button is pushed, show options.
const ShowOptions = () => {

    let analysisBlockStyle = blockBackgroundStyle ();

    // Remove the empty block. We'll render another component in its place
    // and create a new EmptyBlock.

    // Without this "if", EmptyBlock is tried to remove multiple times,
    // hence, resulting to null error.
    if (document.querySelector(".EmptyBlock") !== null) {
        document.querySelector(".EmptyBlock").remove();
    }
    
    const [newPieChart, setNewPieChart] = useState(false);
    const [newBarGraph, setNewBarGraph] = useState(false);

    return (
        <>
            <div className="Options" style={analysisBlockStyle}>
                <p>Select a visualization type:</p>
                <button onClick={() => setNewPieChart(true)}>Pie chart</button>
                <button onClick={() => setNewBarGraph(true)}>Bar graph</button>
            </div>
            {newPieChart && <NewAnalysisBlock type = "piechart"/>}
            {newBarGraph && <NewAnalysisBlock type = "bargraph"/>}
        </>
    )
}

// Third, create a new analysis block and another empty block.
const NewAnalysisBlock = (props) => {

    //console.log(props.type);

    let tempData = [];

    if (props.type === "piechart") {
        tempData = [45, 5, 20, 25, 5];
    } else {
        tempData = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 5];
    }

    // Remove the options block. We'll render another component in its place
    // and create a new EmptyBlock.

    if (document.querySelector(".Options") !== null) {
        document.querySelector(".Options").remove();
    }

    return (
        <>
            <AnalysisBlock visualizationType = {props.type} data = {tempData} />
            <EmptyBlock />
        </>
    );
}




export default EmptyBlock