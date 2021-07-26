import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingScreen from "./screens/LandingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/dashboard" component={DashboardScreen} />
            <Route exact path="/" component={LandingScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Fragment>
  );
};

export default App;
