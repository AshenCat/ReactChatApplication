import React from "react";
import {
  FormControl,
  FormGroup,
  Form,
  Col,
  Button,
  Container,
  Row,
} from "react-bootstrap";
import AdminLanding from "./AdminLanding";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    authenticated: false,
    navLocation: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };

  setLocLogin = () => {
    this.setState({ navLocation: "loggedIn" });
  };

  whichToRender = () => {
    if (this.state.navLocation === "") {
      return (
        <Container className="landingContainer">
          <Col>
            <Row className="justify-content-md-center">
              <h1>Admin Login</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  Username:
                  <FormControl placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  Password:
                  <FormControl placeholder="Password" />
                </FormGroup>
                <Button onClick={this.setLocLogin} variant="dark" type="submit">
                  Login
                </Button>
              </Form>
            </Row>
          </Col>
        </Container>
      );
    } else if (this.state.navLocation === "loggedIn") {
      return <AdminLanding></AdminLanding>;
    }
  };

  render() {
    return <this.whichToRender />;
  }
}

export default Login;
