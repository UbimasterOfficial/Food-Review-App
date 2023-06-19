import React, {useReducer} from "react";
import "./Signup.css";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {GOOGLE_AUTH_URL} from "../../../constants";
import {signup} from "../../../util/APIUtils";
import googleLogo from "../../../img/google-logo.png";
import {toast} from "react-toastify";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import loginImage from '../../../img/login-image.png';

const Signup = ({authenticated}) => {
    const location = useLocation();

    if (authenticated) {
        return (
            <Navigate
                to={{
                    pathname: "/",
                    state: {from: location}
                }}
            />
        );
    }

    return (

        <div className="bg-sky-100">

        <Container fluid>
      <Row>

      <Col md="6">
          <center>
          &nbsp;
            <Image id='loginImage' src={loginImage} height={1000} width={1000}/>
          </center>
        </Col>

        <Col md="6">

        <div className="signup-container  h-screen">
            <div className="signup-content bg-gray-700">
                <h1 className="signup-title">Signup with Foodies... !</h1>
                <SocialSignup/>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <SignupForm/>
                <span className="login-link">
          Already have an account? <Link to="/login">Login!</Link>
        </span>
            </div>
        </div>



        </Col>


      </Row>
      </Container>

      </div>



     

    );
};

const SocialSignup = () => {
    return (
        <div className="social-signup">
            <a
                className="btn btn-block social-btn bg-gray-200 google"
                href={GOOGLE_AUTH_URL}
            >
                <img src={googleLogo} alt="Google"/> Sign up with Google
            </a>
        </div>
    );
};

const SignupForm = () => {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState};
        },
        {
            name: "",
            email: "",
            password: ""
        }
    );
    const navigate = useNavigate();

    const handleInputChange = event => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setState({
            [inputName]: inputValue
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const signUpRequest = Object.assign({}, state);

        signup(signUpRequest)
            .then(response => {
                toast("You're successfully registered. Please login to continue!", {
                    type: "success"
                });

                navigate("/login");
            })
            .catch(error => {
                toast(
                    (error && error.message) ||
                    "Oops! Something went wrong. Please try again!",
                    {type: "error"}
                );
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default Signup;
