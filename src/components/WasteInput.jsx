import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import Form from 'react-bootstrap/Form';

const WasteInput = () => {

    const navigate = useNavigate();
    const logout = useLogout()


    const [wasteTypes, setWasteTypes] = useState([]);

    const signOut = async () => {

        await logout();
        navigate('/linkpage');

    }

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
                setErrorMessage('Server does NOT respond.');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized.');
            } else {
                setErrorMessage('Something went wrong.');
            }
        }
    }

    return (
        <section>
            <h1>Waste Input</h1>
            <br />


            <Form.Select className="wasteInput" aria-label="Default select example">

                <option>Choose the waste type:</option>
                {wasteTypes.map((wasteType) => (
                    <option value={wasteType.value}>{wasteType.title}</option>
                ))}
            </Form.Select>
        </section>
    )
}

export default WasteInput;