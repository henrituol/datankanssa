

const EmptyBlock = () => {

    let analysisBlockStyle = {
        height: 300, 
        width: 250,
        margin: 5,
        backgroundColor: "#E6E6E3"
    }


    return (
        <div className="EmptyBlock" style={analysisBlockStyle}>
            <p>Press + to add an analysis view.</p>
        </div>
    )

}

export default EmptyBlock