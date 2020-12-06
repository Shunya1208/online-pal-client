import React from "react";
import Layout from "./container/Layout/Layout";
import { Route } from "react-router-dom";
import TopPage from "./container/TopPage/TopPage";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Search from "./container/SearchResult/SearchResult";
import UserPage from "./container/UserPage/UserPage";
import Setting from "./container/UserSetting/UserSetting";
import Verification from "./container/Verification/Verification";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import { Redirect, Switch } from "react-router-dom";
import {connect} from "react-redux"


function App(props) {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={TopPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/search" component={Search} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword/:token" component={ResetPassword} />
          <Route path="/user" component={UserPage} />
          <Route path="/verification/:token" component={Verification} />
          {props.isAuthenticated ? <Route path="/setting" component={Setting} /> : <Redirect to="/"/>}
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null,
      selectedUser: state.user.selectedUser
  }
}

export default connect(mapStateToProps)(App);