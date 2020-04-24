import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { userService } from '../../services/UserService';
import { Link, Route } from 'react-router-dom';
import "./Login.css";

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


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authenticated: false,
      formErrors: {
        email: "",
        password: "",
      }
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.validateErrors(name, value, formErrors);
    this.setState({ formErrors, [name]: value });
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
          value.length < 4 ? "Minimum 4 characaters required ❌" : "";
        break;

      default:
        break;
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      var dataAuth;
      await userService.Login(this.state.email, this.state.password).then((result) => {
        this.setState({ authenticated: true });
        dataAuth = result.token;
        localStorage.setItem('login', JSON.stringify({
          login: true,
          token: result.token
        }))
      });
      debugger;
      if (dataAuth) {
        this.props.history.push('/HomeEmployee');
      }
    } else {
      console.error("error plm");
    }
  }


  render() {
    const { formErrors } = this.state;
    const {authenticated} = this.state;
    return (
     <div className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
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
                    People FreeLance
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
                </div>
                <Button color="primary" type="submit">Login</Button>{' '}
                <p>Not registered? <Link to='/Register'>Create Account</Link></p>
              </form>
            </div>
          </div>
        </div>
        <Route authenticated={authenticated}></Route>
      </div>
    );
  }
}

export default Login;