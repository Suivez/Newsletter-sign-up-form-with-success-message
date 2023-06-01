import React from 'react'
import './Signup.css';
import illustrationDesktop from "../images/illustration-sign-up-desktop.svg";
import illustrationMobile from "../images/illustration-sign-up-mobile.svg";
import iconList from "../images/icon-list.svg";
import iconSuccess from "../images/icon-success.svg";
import { useState, useRef } from "react";
import {motion} from 'framer-motion';

const succesAnimation = {
    initial: { scale: 0 },
    animate: { rotate: 360, scale: 1 },
    transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        ease: "easeOut",
        duration: 0.2
    }
}

const Signup = () => {
    const [errorEmail, setErrorEmail] = useState("");
    const [isActiveError, setIsActiveError] = useState(false);
    const [showState, setShowState] = useState(false);
    const inputRefEmail = useRef(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const switchToSignUp = () => {
        setShowState(false)
    }

    const currentEmailValue = () => {
        return inputRefEmail.current.value;
    }

    const submitEmail = (event) => {
        event.preventDefault();

        if (inputRefEmail.current.value === "" || !isValidEmail(inputRefEmail.current.value)) {
            setErrorEmail("Valid email required");
            setIsActiveError(true);
            setShowState(false);
            console.log("ERROR: email is valid or empty");
        } else {
            setErrorEmail("");
            setIsActiveError(false);
            setShowState(true);
            console.log("INFO: email is correct");
        }
    };

    const thanksState = () => {
        return (
            <div className="container-thank">
                <div>
                    <motion.div style={{width: "min-content"}} variants={succesAnimation} initial="initial" animate="animate" transition="transition"><img src={iconSuccess} /></motion.div>
                    <h1>Thanks for subscribing!</h1>
                    <p>
                        A confirmation email has been sent to <span>{currentEmailValue()}</span>. 
                        Please open it and click the button inside to confirm your subscription.
                    </p>
                </div>
                <button onClick={switchToSignUp}>Dismiss Message</button>
            </div>
        )
    } 

    const signupState = () => {
        return (
            <div className="container-signup">
                <div className="side">
                    <h1>
                        Stay updated!
                    </h1>
                    <p>Join 60,000+ product managers receiving monthly updates on:</p>
                    <div className="list-box">
                        <div className="single-list">
                            <motion.img variants={succesAnimation} initial="initial" animate="animate" transition="transition" src={iconList} />
                            <p>Product discovery and building what matters</p>
                        </div>
                        <div className="single-list">
                            <motion.img variants={succesAnimation} initial="initial" animate="animate" transition="transition" src={iconList} />
                            <p>Measuring to ensure updates are a success</p>
                        </div>
                        <div className="single-list">
                            <motion.img variants={succesAnimation} initial="initial" animate="animate" transition="transition" src={iconList} />
                            <p>And much more!</p>
                        </div>
                    </div>
                    <div className="form">
                        <div className="label-box">
                            <div className="label-state" ref={inputRefEmail}>Email address</div>
                            <div className="error-state">{errorEmail}</div>
                        </div>
                        <input
                            type="email"
                            placeholder="email@company.com"
                            ref={inputRefEmail}
                            style={{
                                borderColor: isActiveError ? "hsl(4, 100%, 67%)" : "",
                                backgroundColor: isActiveError ? "hsla(4, 100%, 67%, 0.2)" : "",
                                color: isActiveError ? "hsl(4, 100%, 67%)" : "",
                            }}
                        />
                        <button onClick={submitEmail}>Subscribe to monthly newsletter</button>
                    </div>
                </div>
                <picture className="side">
                    <source media="(max-width: 950px)" srcSet={illustrationMobile} />
                    <img src={illustrationDesktop} />
                </picture>
            </div>
        )
    }

    return (
        <div className="main">
            {showState ? <div>{thanksState()}</div> : <div>{signupState()}</div>}
        </div>
    )
}

export default Signup;