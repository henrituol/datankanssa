import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form} from 'react-bootstrap';
import AnalysisBlock from "./AnalysisBlock"

// Is it bad to have multiple components in one file even though they work together?
// Also, this is just a kind of helper component not to be used from anywhere else.

// Import helper function
import { blockBackgroundStyle } from "./utils";

// Let's create another helper to make following code slightly more compact:
// When an analysis block with visualisation is created, clear the empty block.
function removeEmpty () {
    document.querySelector(".EmptyBlock").remove();
}

// Create an empty block and a modal window for options.
const EmptyBlock = () => {

    let analysisBlockStyle = blockBackgroundStyle ();
    
    const [newPieChart, setNewPieChart] = useState(false);  // When this turns into right, we'll call another component.
    const [newBarGraph, setNewBarGraph] = useState(false);

    // Note: useState is asynchronous, therefore,
    // to check values from the form, let's utilize useRef.
    const pieSelected = useRef(false);
    const barSelected = useRef(false);

    // Modal might be suitable solution for showing options.
    // Starting off from this tutorial:
    // https://ordinarycoders.com/blog/article/react-bootstrap-modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = () => {
        handleClose(); // Close like in the cancel button, but also update rendering according to selections.
        if ( pieSelected.current === true ) {
            setNewPieChart(true); removeEmpty();
        } else if ( barSelected.current === true ) {
            setNewBarGraph(true); removeEmpty();
        } else {
            alert("Did you remeber to specify visualization type?");
        }
    }

    // If user makes a selection, then presses cancel, selected value ought to be cleared.
    // Otherwise the user could come back to the modal window, and without selection just press
    // "Add" and, surprise, a previous selection would work.
    const cleanSelections = () => {
        pieSelected.current = false; 
        barSelected.current = false; 
    }

    return (
        <>
            <div className="EmptyBlock" style={analysisBlockStyle}>
                <p>Press + to add an analysis view.</p>
                <Button variant="primary" onClick={handleShow}>+</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose data and visualization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <Form.Select aria-label="Select visualization type" 
                        onChange={valueOfSelection => {
                            // console.log("Value of the selection", valueOfSelection.target.value);
                            switch (valueOfSelection.target.value) {
                                case "1":
                                    pieSelected.current = true; 
                                    barSelected.current = false;                         
                                    break;
                                case "2":
                                    pieSelected.current = false;    
                                    barSelected.current = true;
                                    break;
                                default:
                                    console.log("Something went wrong!")
                            }
                        }}>
                        <option>Select visualization type</option>
                        <option value="1">Pie chart</option>
                        <option value="2">Bar graph</option>
                    </Form.Select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleAdd}>Add</Button>
                <Button variant="secondary" onClick={ () => {handleClose(); cleanSelections();}}>Cancel</Button>
            </Modal.Footer>
            </Modal>
            {newPieChart && <NewAnalysisBlock type = "piechart"/>}
            {newBarGraph && <NewAnalysisBlock type = "bargraph"/>}
        </>
    );
}

// A helper component for the next section.
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

// Next, create a new analysis block and another empty block.
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

export default EmptyBlock