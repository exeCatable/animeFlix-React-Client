import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "./registration-view.scss";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const validEmail = pattern.test(email);

    if (!email || !validEmail) {
      alert("incorrect email format");
      return;
    }

    axios
      .post("https://anime-flix-db.herokuapp.com/users", {
        Username: username,
        Password: password,
        ConfirmPassword: confirmPassword,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <Container fluid>
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>

        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3>REGISTRATION</h3>
                  <p className="text-white mb-4">Join us, we have cookies!</p>
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:*</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>
                        Email: <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter your Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>
                        Password:<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="confirmformPassword">
                      <Form.Label>
                        Confirm Password:<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        placeholder="Enter Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="MM/DD/YYYY"
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      className="button"
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <p className="mt-5">
                      Already have an account?
                      <Link to="/"> Login</Link>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
