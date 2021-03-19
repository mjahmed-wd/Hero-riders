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

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  return (
    <VehicleContext.Provider value={[selectedVehicle, setSelectedVehicle]}>
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
    </VehicleContext.Provider>
  );
}

export default App;
