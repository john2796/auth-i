import React, { Component } from "react";
import UserCardPage from "../userCard/UserCardPage";
import { connect } from "react-redux";
import { getAllUser } from "../../store/action/authAction";

class UserPage extends Component {
  componentDidMount() {
    this.props.getAllUser();
  }

  render() {
    return (
      <div>
        <h1 className="user-title">USERS </h1>
        <div className="card-container">
          {this.props.users.map(user => {
            return <UserCardPage user={user} key={user.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.authReducer.users
});

export default connect(
  mapStateToProps,
  { getAllUser }
)(UserPage);
