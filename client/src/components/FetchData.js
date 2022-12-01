import { useState, useEffect } from "react";
import LoadingBlock from "./LoadingBlock.js"
import AnalysisBlock from "./AnalysisBlock"
import EmptyBlock from "./EmptyBlock.js";

// Create a new analysis block and another empty block.
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
    // - Querying all the data would take a lot of time, because dataset is rather big.

    // And before we continue, the query is modified according to selected dates.
    // props.dates is an array with two dates in the form yyyy-mm-dd.
    // First one is starting date and second one is ending date.
    // Although API version 1.0 instructs to use milliseconds,
    // I noticed that with the API version 1.1 milliseconds do not work, but format 2011-01-01 is usable.
    // Hence, we can use the dates as is in the props.dates.


    async function loadData () {

        // Here's the place to edit the query, if needed
        const startDate = props.dates[0];
        const endDate = props.dates[1];

        const target = `https://hsl.louhin.com/api/1.1/data/350/content?limit=1000&variables=K3B&filter[PÄIVÄMÄÄRÄ]=` + startDate + "to" + endDate + `&LWSAccessKey=b21f0e72-de32-4cee-ab24-242eeba7726b`;

        // Specify that the data which we are fetching is in text/csv type.
        return await fetch( target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        })
        .then(response => response.text()) // There has to be clearer solution to this. See, bunch of RegEx down...
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