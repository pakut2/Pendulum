import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingView from "./views/LandingView";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ProfileView from "./views/ProfileView";
import UserListView from "./views/UserListView";
import CreatePostView from "./views/CreatePostView";
import UserEditView from "./views/UserEditView";
import MapView from "./views/MapView";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/dashboard" component={DashboardView} />
            <Route path="/post" component={CreatePostView} />
            <Route exact path="/map/:id" component={MapView} />
            <Route path="/admin/userlist" component={UserListView} />
            <Route exact path="/admin/user/:id/edit" component={UserEditView} />
            <Route exact path="/" component={LandingView} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Fragment>
  );
};

export default App;
