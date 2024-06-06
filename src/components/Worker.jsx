import { Link } from "react-router-dom"

const Worker = () => {
    return (
        <section>
            <h1>Worker Page</h1>
            <br />
            <p>You must have been assigned an Worker role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Worker