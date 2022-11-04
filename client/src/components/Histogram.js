// Props could be the data we want to visualize.

const Histogram = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                {props.data}
            </p>
        </div>
    )
}

export default Histogram;