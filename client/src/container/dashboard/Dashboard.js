import React, { Component } from "react";
import NavBarPage from "../../component/navbar/NavbarPage";
import { connect } from "react-redux";
import UserPage from "../../component/user/UserPage";
class dashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <NavBarPage />
        <h1 className="d_title">hello Master {user.username} </h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ixonso9YpBKn5jvsY8PL6_peAWsYnKx_ES3YeQw94V0AQizf"
          alt="ninja"
          className="ninja-image"
        />
        <UserPage />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps)(dashboard);
