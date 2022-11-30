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

    // And before we continue, the query is modified according to selected dates.
    // props.dates is an array with two dates in the form yyyy-mm-dd.
    // First one is starting date and second one is ending date.
    // Split years, months, dates etc. to their own variables.


    const startMilliseconds = new Date(props.dates[0]).getTime();
    console.log(startMilliseconds);
    const endMilliseconds = new Date(props.dates[1]).getTime();
    console.log(endMilliseconds);

    async function loadData () {

        // Here's the place to edit the query.
        // Basic testing query:
        // const target = "https://hsl.louhin.com/api/1.1/data/350/content?limit=1000&variables=K3B&LWSAccessKey=b21f0e72-de32-4cee-ab24-242eeba7726b";

        // Seems like the PÄIVÄMÄÄRÄ doesn't work in the api version 1.1...
        const target = "https://hsl.louhin.com/api/1.1/data/350/content?limit=1000&variables=K3B&filter[PÄIVÄMÄÄRÄ]=" + startMilliseconds + "to" + endMilliseconds + "&LWSAccessKey=b21f0e72-de32-4cee-ab24-242eeba7726b";
        // It does give 200 message in Insomnia, but no data...

        // Everything should work as it used to, but that's not how it looks like.
        // In insomnia:
        // https://hsl.louhin.com/api/1.1/data/350/content?limit=100&filter[PÄIVÄMÄÄRÄ]=1356991200000to1388527199000 this doesn't load data. Without the filter it works fine.
        // https://hsl.louhin.com/api/1.0/data/350?limit=100&filter[PÄIVÄMÄÄRÄ]=1356991200000to1388527199000 this does.

        // A possible workaround might be something like this:
        // Fetch data as a whole containing only the variable we're visualizing and dates, and afterwards filter by dates.
        // How long does the query take? 

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