import { useState } from "react";
import AnalysisBlock from "./AnalysisBlock"

// When a button is pushed, a new view should appear.
// In the new view, you can select the type of visualization and data.
// However, in this first version: click +-button and render something with dummy data.


// Is it bad to have to components in one file even though they work together?
// Also, this is just a helper component not to be used from anywhere else.
const ShowView = () => {

    let tempData = [45, 5, 20, 25, 5];

    // Remove the empty block. We'll render another component in its place
    // and create a new EmptyBlock.
    document.querySelector(".EmptyBlock").remove();
    return (
        <>
            <AnalysisBlock visualizationType = "piechart" data = {tempData} />
            <EmptyBlock />
        </>
    );
}


const EmptyBlock = () => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 5,
        backgroundColor: "#dcd5d5"
    }

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="EmptyBlock" style={analysisBlockStyle}>
                <p>Press + to add an analysis view.</p>
                <button onClick={() => setShow(true)}>+</button>
            </div>
            {show && <ShowView />}
        </>

    )

}

export default EmptyBlock