// Import helper function
import { blockBackgroundStyle } from "./utils";

// A helper component for the next section.
const LoadingBlock = () => {
    let analysisBlockStyle = blockBackgroundStyle ();
    return (
        <>
            <div className="LoadingBlock" style={analysisBlockStyle}>
                <p className="block-description">Loading...</p>
            </div>
        </>
    )
}

export default LoadingBlock;