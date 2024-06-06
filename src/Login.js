import { useRef, useState, useEffect } from 'react';

import useAuth from "./hooks/useAuth";

import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from './api/axios';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const LOGIN_URL = 'api/Auth/login';

const PHONE_COUNTRY = "90";

const Login = () => {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const errRef = useRef();

    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        setErrorMessage('');
    }, [phoneNumber, password])

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ phone : PHONE_COUNTRY + phoneNumber, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            
            const phoneInfo = PHONE_COUNTRY + phoneNumber
            setAuth({ phoneInfo, password, roles, accessToken });
            
            setPhoneNumber('');
            setPassword('');
            navigate(from, { replace: true });

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
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <>
            <section>
                <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="phone">
                            Phone:
                    </label>
                    <PhoneInput
                    country={'tr'}
                    disableCountryCode = {true}
                    placeholder = {"+90 521 16 32"}
                    value={phoneNumber}
                    onlyCountries = {['tr']}
                    onChange={e => setPhoneNumber(e)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                    <div className="persistCheck">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </section>
        </>
    )
}

export default Login
