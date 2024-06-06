import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Form from 'react-bootstrap/Form';

import axios from "axios";

// minimum 8 maximum 16 letters for password
const PASSWORD_REGEX_EXPRESSION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,16}$/;

const REGISTER_URL = '/api/Auth/create-cleaning-staff';

const Register = () => {

    // const firstNameRef = useRef();
    const errRef = useRef();

    // const [username, setUserName] = useState('');
    // const [isValidUsername, setIsValidUserName] = useState(false);
    // const [isUserNameFocused, setIsUserNameFocused] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);

    const [lastName, setLastName] = useState('');

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [passwordAgain, setPasswordAgain] = useState('');
    const [isValidPasswordAgain, setIsValidPasswordAgain] = useState(false);
    const [isPasswordAgainFocused, setIsPasswordAgainFocused] = useState(false);

    const [phone, setPhone] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [faculties, setFaculties] = useState([]);

    const [choosenFacultyId, setChoosenFacultyId] = useState("")

    // when the page reloads
    /* useEffect(() => {
        firstNameRef.current.focus();
    }, []) */

    // when either password-one or password-two inputs are changed
    useEffect(() => {

        const isPasswordValid = PASSWORD_REGEX_EXPRESSION.test(password);

        console.log(isPasswordValid);
        console.log(password)
        
        setIsValidPassword(isPasswordValid)

        const isMatched = password === passwordAgain;
        setIsValidPasswordAgain(isMatched)
    }, [password, passwordAgain])

    // when either one of those username, password-one, password-two two inputs are changed
    useEffect(() => {
        setErrorMessage('');
    }, [password, passwordAgain])


    useEffect( () => {

        fetchFaculties();
    }, [])

    const fetchFaculties = async() => {

        const FACULTY_URL = '/api/Faculty';
        try {
            const response = await axios.get(FACULTY_URL, {baseURL: 'https://localhost:7299'});

            console.log(JSON.stringify(response?.data));

            const facultiesData = response?.data 
                ? response.data.data
                : [];
            
            setFaculties(facultiesData);

        } catch (err) {
            
            if (!err?.response) {
                setErrorMessage('Server does NOT respond.');
            } else if (err.response?.status === 400) {
                setErrorMessage('Username or password is missing.');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized.');
            } else {
                setErrorMessage('Something went wrong.');
            }
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try {

            const phoneCode = phone.substring(0,2);
            const phoneNumber = phone.substring(2, phone.length);

            console.log(JSON.stringify({ 
                firstName : firstName,
                lastName: lastName,
                password: password,
                phone: {
                    phoneCode : phoneCode,
                    phoneNumber : phoneNumber
                }
                }))
            
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ 
                    firstName : firstName,
                    lastName: lastName,
                    password: password,
                    phone: {
                        phoneCountry : phoneCode,
                        phoneNumber : phoneNumber
                    },
                    facultyId : choosenFacultyId,
                    }),
                {
                    baseURL: "https://localhost:7299",
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response)
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            
            setIsSuccess(true);

            //clear state and controlled inputs
            //need value attrib on inputs for this
            // setUserName('');
            setPassword('');
            setPasswordAgain('');


        } catch (err) {
            if (!err?.response) {
                setErrorMessage('Server does NOT respond now.');
            } else if (err.response?.status === 409) {
                setErrorMessage('This username is taken already.');
            } else {
                setErrorMessage('Something went wrong.')
            }
            errRef.current.focus();
        }
    }

    return(
        <>
            {isSuccess ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    
                    <h1>Register</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            // ref={firstNameRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            aria-describedby="uidnote"
                            onFocus={() => setIsFirstNameFocused(true)}
                            onBlur={() => setIsFirstNameFocused(false)}
                        />

                        <label htmlFor="lastName">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            aria-describedby="uidnote"
                        />

                        <label htmlFor="phone">
                            Phone:
                        </label>

                        <PhoneInput
                        country={'tr'}
                        value={phone}
                        onlyCountries = {['tr']}
                        onChange={e => setPhone(e)}
                        />

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={isValidPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={(isValidPassword || !password) ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={isValidPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />
                        <p id="pwdnote" className={isPasswordFocused && !isValidPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 16 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={isValidPasswordAgain && passwordAgain ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={isValidPasswordAgain || !passwordAgain ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            value={passwordAgain}
                            required
                            aria-invalid={isValidPasswordAgain ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setIsPasswordAgainFocused(true)}
                            onBlur={() => setIsPasswordAgainFocused(false)}
                        />
                        <p id="confirmnote" className={isPasswordAgainFocused && !passwordAgain ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <Form.Select className="wasteInput" 
                        aria-label="Default select example"
                        onChange = {(e) => setChoosenFacultyId(e.target.value)}>
                            <option>Choose the faculty:</option>
                            {faculties.map( (eachFaculty) => (
                                <option value = {eachFaculty.value}>{eachFaculty.title}</option>
                            ))}
                        </Form.Select>

                        <button disabled={!isValidPassword || !isValidPasswordAgain ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;