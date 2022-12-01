import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form} from 'react-bootstrap';
import FetchData from "./FetchData.js";
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

    // If user doesn't provide dates, use default values.
    let startDate = useRef("2021-01-01");
    let endDate = useRef("2021-12-31");
    // Otherwise, run this function:
    const handleDateChange = (dateType, newDate) => {
        switch (dateType) {
            case "start":
                startDate.current = newDate;
                break;
            case "end":
                endDate.current = newDate;
                break;
        }
    }

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

    // In this return, a modal window is opened, where a user can select data to be visualized and the type of visualization.
    // How about filtering data by date?
    // Also, might be interesting to include at least a couple of different variables. Overall satisfaction, ofcourse.
    // What else? Something that would look like somewhat different.
    // Note about datepicker: I added somewhat arbitrary default values to enable faster testing of the app.
    // Datepicker's format depends on the locale (language) of the browser.
    return (
        <>
            <div className="EmptyBlock" style={analysisBlockStyle}>
                <p className="block-description">Press + to add an analysis view.</p>
                <Button variant="primary" 
                        id="add-button"
                        style={{ marginLeft: "102px", 
                                marginTop: "70px",
                                fontSize: "xxx-large",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                paddingTop: "0px",
                                paddingBottom: "4px"
                            }}
                        onClick={handleShow}>
                        + 
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose data and visualization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <Form.Group controlId="dates">
                        <div className="col" style= {{ margin: "10px" }}>
                            <Form.Label>Select starting date</Form.Label>
                            <Form.Control type="date" name="startDate" defaultValue="2019-01-01" onChange={ (selection) => { handleDateChange("start", selection.target.value) }}/>
                        </div>
                        <div className="col" style= {{ margin: "10px" }}>
                            <Form.Label>Select ending date</Form.Label>
                            <Form.Control type="date" name="endDate" defaultValue="2021-12-31" onChange={ (selection) => { handleDateChange("end", selection.target.value) }}/>
                        </div>
                    </Form.Group>
                </div>
                <div className="row" style= {{ margin: "10px", marginTop: "30px" }}>
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
            {newPieChart && <FetchData type = "piechart" dates = {[startDate.current, endDate.current]} />}
            {newBarGraph && <FetchData type = "bargraph" dates = {[startDate.current, endDate.current]} />}
        </>
    );
}

export default EmptyBlock