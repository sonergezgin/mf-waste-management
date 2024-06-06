import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import Form from 'react-bootstrap/Form';

const WasteInput = () => {

    const navigate = useNavigate();
    const logout = useLogout()

    const signOut = async () => {

        await logout();
        navigate('/linkpage');

    }

    return (
        <section>
            <h1>Waste Input</h1>
            <br />


            <Form.Select className="wasteInput" aria-label="Default select example">
                <option>Enter the waste type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </section>
    )
}

export default WasteInput;