import { useState, useEffect } from "react";
import AnalysisBlock from "./AnalysisBlock"

// Import helper function
import { blockBackgroundStyle } from "./utils";

// When a button is pushed, a new view should appear.
// In the new view, you can select the type of visualization and data.
// However, in this first version: click +-button and render something with dummy data.

// Is it bad to have to components in one file even though they work together?
// Also, this is just a kind of helper component not to be used from anywhere else.

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

const LoadingBlock = () => {

    let analysisBlockStyle = blockBackgroundStyle ();
    
    return (
        <>
            <div className="LoadingBlock" style={analysisBlockStyle}>
                <p>Loading...</p>
            </div>
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

    // When dataIsLoaded is true, render bargraph with proper data.
    // dataIsLoaded will be updated in useEffect after data is fetched.
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [dataFromQuery, setDataFromQuery] = useState([]);

    // Query Asty Data API
    // https://hsl.louhin.com/asty/help
    // At the time of writing, 1.0 is public, but with 1.1 it is possible to query only selected parameters.
    // Also, specify for the fetch that we want text/csv type data.

    // Also, render the fetched data.
    // I.e. "render as you fetch":
    // There use to React Suspense, but it is outdated apparently.

    async function loadData () {
        const offset = Math.floor(Math.random() * 9);

        const target = "https://hsl.louhin.com/api/1.1/data/350/content?offset=40000&limit=1000&variables=K3B&LWSAccessKey=b21f0e72-de32-4cee-ab24-242eeba7726b";
        return await fetch( target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        })
        .then(response => response.text()) // There has to be clearer solution to this. See, bunch of RegEx down.
        .then((response) => {
            return response;
        })
        .catch(err => console.log(err));
    };

    // useEffect is run when everything else is ready.
    useEffect(()=> {
        (async () => {
            let loadedData = await loadData();
            //console.log(typeof loadedData);
            //console.log(loadedData);
            // Transform values to a proper looking array.
            // How to do it the best way? How to get proper values?
            // Perhaps the number before line break  and "-symbol?
            // Also, excluding the first one. Let see, if we manage to get everything in order.
            // RegEx?
            loadedData = loadedData.replaceAll(';', ',');
            // Let's split to a few different RegEx calls to make it easier to read.
            // Regex for a lookback and lookahead to change number between " and ", i.e. first number:
            loadedData = loadedData.replaceAll(/(?<=\")[0-9]+(?=\",)/g , 'x');
            // Then delete line break and redundant ID material.
            loadedData = loadedData.replaceAll(/(\n"x")/g , '');
            loadedData = loadedData.replaceAll(/(,\")/g , '');
            loadedData = loadedData.replaceAll(/\"/g , '');
            // Then final cleaning without the RegEx:
            // First, the last line break that wasn't deleted already:
            loadedData = loadedData.replace('\n', '');
            // Second, clean headers. Note that label is now K3B, so works only with that.
            loadedData = loadedData.replace('labelK3B', '');
            
            const cleanedData = loadedData.split('');

            //console.log(cleanedData);
            //console.log([cleanedData]);

            setDataFromQuery(cleanedData);
            setDataIsLoaded(true);
        })();
    }, []);

    // Remove the options block. We'll render another component in its place
    // and create a new EmptyBlock.
    if (document.querySelector(".Options") !== null) {
        document.querySelector(".Options").remove();
    }

    return (
        <>
            {!dataIsLoaded && <LoadingBlock />}
            {dataIsLoaded && <AnalysisBlock visualizationType = {props.type} data={dataFromQuery}/>}
            {dataIsLoaded && <EmptyBlock />}
        </>
    );
}

export default EmptyBlock