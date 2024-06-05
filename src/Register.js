import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";


// minimum 4 maximum 24 letters for username
const USERNAME_REGEX_EXPRESSION = /^[A-z][A-z0-9-_]{4,16}$/;  

// minimum 8 maximum 16 letters for password
const PASSWORD_REGEX_EXPRESSION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,16}$/;


const REGISTER_URL = '/register';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUserName] = useState('');
    const [isValidUsername, setIsValidUserName] = useState(false);
    const [isUserNameFocused, setIsUserNameFocused] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [passwordAgain, setPasswordAgain] = useState('');
    const [isValidPasswordAgain, setIsValidPasswordAgain] = useState(false);
    const [isPasswordAgainFocused, setIsPasswordAgainFocused] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // when the page reloads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // when the username input is changed
    useEffect(() => {

        const isUsernameValid = USERNAME_REGEX_EXPRESSION.test(username);

        console.log(isUsernameValid);
        console.log(username); 
        
        setIsValidUserName(isUsernameValid);
    }, [username])

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
    }, [username, password, passwordAgain])



    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ userName: username, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            
            setIsSuccess(true);

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUserName('');
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
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={isValidUsername ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={isValidUsername || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                            required
                            aria-invalid={isValidUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setIsUserNameFocused(true)}
                            onBlur={() => setIsUserNameFocused(false)}
                        />
                        <p id="uidnote" className={isUserNameFocused && username && !isValidUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 16 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


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

                        <button disabled={!isValidUsername || !isValidPassword || !isValidPasswordAgain ? true : false}>Sign Up</button>
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