import { useState, useEffect } from "react";
import LoadingBlock from "./LoadingBlock.js"
import AnalysisBlock from "./AnalysisBlock"
import EmptyBlock from "./EmptyBlock.js";

// Next, create a new analysis block and another empty block.
// To have meaningful visualizations, let's utilize HSL Asty customer satisfaction survey:
// https://hsl.louhin.com/asty/

const FetchData = (props) => {

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
        const offset = Math.floor(Math.random() * 5);

        const target = "https://hsl.louhin.com/api/1.1/data/350/content?offset=" + offset + "0000&limit=1000&variables=K3B&LWSAccessKey=b21f0e72-de32-4cee-ab24-242eeba7726b";
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
            // Best way to clean up the textual data? RegEx?
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

            setDataFromQuery(cleanedData);
            setDataIsLoaded(true);
        })();
    }, []);

    return (
        <>
            {!dataIsLoaded && <LoadingBlock />}
            {dataIsLoaded && <AnalysisBlock visualizationType = {props.type} data={dataFromQuery}/>}
            {dataIsLoaded && <EmptyBlock />}
        </>
    );
}

export default FetchData;