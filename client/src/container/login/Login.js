import React from "react";
import {
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Card,
  Button,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { loginUser } from "../../store/action/authAction";
import { withRouter, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const newUser = {
      username,
      password
    };
    this.props.loginUser(newUser);
  };

  render() {
    console.log(this.props.errors);

    return (
      <Row>
        <Col sm="6" md="5" style={{ margin: "10vh auto" }}>
          <Card body>
            <CardTitle>LOGIN</CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="username"
                  onChange={this.handleChange}
                  name="username"
                  value={this.state.username}
                  invalid={this.props.errors.username && true}
                />
                {this.props.errors && (
                  <FormFeedback>{this.props.errors.username}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="password"
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  invalid={
                    (this.props.errors.password && true) ||
                    (this.props.errors.message && true)
                  }
                />
                {this.props.errors && (
                  <FormFeedback>{this.props.errors.password}</FormFeedback>
                )}
                {this.props.errors && (
                  <FormFeedback>{this.props.errors.message}</FormFeedback>
                )}
              </FormGroup>
              <Link to="/">Need to register ?</Link> <br />
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  isAuthenticated: state.authReducer.isAuthenticated,
  errors: state.authReducer.errors,
  user: state.authReducer.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
