import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
            role: null,
            formErrors: {
                email: "",
                password: "",
                confirmPassword: "",
                role: ""
            },
        };
    }

    validateErrors = (name, value, formErrors) => {
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "Invalid email address ❌";
                break;

            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characaters required ❌" : "";
                break;

            case "confirmPassword":
                formErrors.confirmPassword =
                    value.length < 6 ? "Minimum 6 characaters required ❌" : "";

                formErrors.confirmPassword = 
                    value !== this.state.password ? "Passwords not match ❌": ""
                break;

            
            case "role":
                formErrors.role =
                    value === "Choose role" ? "You need to choose a role for user" : "";
                break;
            default:
                break;
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        this.validateErrors(name, value, formErrors);
        this.setState({ formErrors, [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        if (formValid(this.state)) {
            console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            Role: ${this.state.role}
          `);
        } else {
            console.log(formValid(this.state))
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-5" style={{ height: "100vh" }}>

                            <form
                                className="form align-middle w-75"
                                style={{
                                    position: "relative",
                                    margin: "50%",
                                    textAlign: "center"
                                }}
                                onSubmit={this.handleSubmit}
                            >
                                <h3>
                                    <em>
                                        Sign Up to People FreeLance
                                    </em>
                                </h3>

                                <div className="form-group">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ float: "left" }}><h6><em>Email address</em></h6></Form.Label>
                                        <Form.Control
                                            className={formErrors.email.length > 0 ? "error" : null}
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {
                                            formErrors.email.length > 0 && (
                                                <h6><em className="errorMessage">{formErrors.email}</em></h6>
                                            )}

                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label style={{ float: "left" }}><h6><em>Password</em></h6></Form.Label>
                                        <Form.Control
                                            className={formErrors.password.length > 0 ? "error" : null}
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Label style={{ float: "left" }}><h6><em style={{ color: "white" }}>Confirm password</em></h6></Form.Label>
                                        <Form.Control
                                            className={formErrors.confirmPassword.length > 0 ? "error" : null}
                                            placeholder="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.confirmPassword.length > 0 && (
                                            <span className="errorMessage">{formErrors.confirmPassword}</span>
                                        )}
                                    </Form.Group>

                                    <label style={{ float: "left" }}><h6><em style={{ color: "white" }} >What role you will have?</em></h6></label>
                                    <select 
                                        className={formErrors.role.length > 0 ? "form-control error" : "form-control"}
                                        onChange={this.handleChange}
                                        required
                                        name = "role"
                                    >
                                        <option value="Choose role">Choose role</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Employeer">Employeer</option>

                                    </select>
                                    {formErrors.role.length > 0 && (
                                        <span className="errorMessage">{formErrors.role}</span>
                                    )}
                                </div>
                                <Button type="submit" color="primary"><em>Sing Up</em></Button>{' '}
                                <hr />
                                <h6><em style={{ color: "white" }}>Back to <Link to='/Login'>Sing in</Link></em></h6>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register