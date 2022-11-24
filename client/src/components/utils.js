// utils.js is a collection of utilities, helpers etc. for components.

// Create a unique ID for a div, so that d3js visualization can be matched with the proper container.
export function uniqueIdCreator () {
    
    let divId = Math.floor(Math.random() * 99999);
    // Let's make sure the ID is unique.
    if (document.getElementById(divId) !== null) {
        while (document.getElementById(divId) !== null) {
            divId = Math.floor(Math.random() * 99999);
        }
    }
    let uniqueDiv = "Id" + divId;

    return uniqueDiv;
}
