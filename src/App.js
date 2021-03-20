// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Container } from "react-bootstrap";
import { createContext, useState } from "react";
import Login from "./components/Login/Login";

export const VehicleContext = createContext()
export const UserContext = createContext()

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    givenPassword: "",
    confirmPassword: "",
    photo: "",
  });
  return (
    <VehicleContext.Provider value={[selectedVehicle, setSelectedVehicle]}>
      <UserContext.Provider value={[user,setUser]}>
      <div className="homePage">
        <Router>
          <Container>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="*"></Route>
            </Switch>
          </Container>
        </Router>
      </div>
      </UserContext.Provider>
    </VehicleContext.Provider>
  );
}

export default App;
