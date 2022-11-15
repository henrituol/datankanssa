import { useState } from "react";
import AnalysisBlock from "./AnalysisBlock"

// When a button is pushed, a new view should appear.
// In the new view, you can select the type of visualization and data.
// However, in this first version: click +-button and render a pie chart with dummy data.

const EmptyBlock = () => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 5,
        backgroundColor: "#E6E6E3"
    }

    let tempData = [45, 5, 20, 25, 5];

    function chooseView() {
        console.log("Clicked +-button")
    }

    return (
        <div className="EmptyBlock" style={analysisBlockStyle}>
            <p>Press + to add an analysis view.</p>
            <button onClick={chooseView}>+</button>
        </div>
    )

}

export default EmptyBlock