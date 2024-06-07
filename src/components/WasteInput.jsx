import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import Form from 'react-bootstrap/Form';

import axios from "../api/axios";


const WasteInput = () => {

    const navigate = useNavigate();
    const logout = useLogout()


    const [wasteTypes, setWasteTypes] = useState([]);
    const [weight, setWeight] = useState(0);

    const [choosenWasteType, setChoosenWasteType] = useState("");

    const signOut = async () => {

        await logout();
        navigate('/linkpage');

    }

    useEffect(() => {
        fetchWasteTypes();
    }, [])


    const fetchWasteTypes = async () => {

        const WASTE_TYPE_URL = '/api/WasteType';

        try {
            const response = await axios.get(WASTE_TYPE_URL, { baseURL: 'https://localhost:7299' });

            console.log(JSON.stringify(response?.data));

            const wasteTypeData = response?.data
                ? response.data.data
                : [];

            console.log("response is");
            console.log(response);

            setWasteTypes(wasteTypeData);

        } catch (err) {

            if (!err?.response) {
                console.error('Server does NOT respond.');
            } else if (err.response?.status === 401) {
                console.error('Unauthorized.');
            } else {
                console.error('Something went wrong.');
            }
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const WASTE_ADD_URL = "api/Waste/add"

        try {
            const response = await axios.post(WASTE_ADD_URL,
                JSON.stringify({ wasteTypeId: choosenWasteType, weight: weight }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log("response from submitting waste input", response);

            navigate(from, { replace: true });

        } catch (err) {

            if (!err?.response) {
                console.error('Server does NOT respond.');
            } else if (err.response?.status === 401) {
                console.error('Unauthorized.');
            } else {
                console.error('Something went wrong.');
            }
        }
    }

}
return (
    <section>
        <h1>Waste Input</h1>
        <br />

        <form onSubmit={handleSubmit}>

            <Form.Select
                className="wasteInput"
                aria-label="Default select example"
                onChange={(e) => setChoosenWasteType(e.target.value)}
                required>
                <option>Choose the waste type:</option>
                {wasteTypes.map((wasteType) => (
                    <option value={wasteType.value}>{wasteType.title}</option>
                ))}
            </Form.Select>

            <label htmlFor="weight">Weight:</label>
            <input
                type="number"
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                required
            />

            <button>Enter</button>

        </form>
    </section>
)


export default WasteInput;