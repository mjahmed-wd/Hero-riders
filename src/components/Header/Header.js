import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { firebaseInitialization, handleSignOut } from "../Login/SignOut";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [user,setUser] = useContext(UserContext);
  console.log("user", user);
  firebaseInitialization()
  const handleLogOut= ()=>{
    handleSignOut().then(res=>setUser(res))
  }
  
    let history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Link to="/">
        <Navbar.Brand>Hero Riders</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={()=>history.push('/home')}>Home</Nav.Link>
          <Nav.Link onClick={()=>history.push('/booking')}>Destination</Nav.Link>
          <Nav.Link href="#pricing">Blog</Nav.Link>
          <Nav.Link>Contact</Nav.Link>
         
          {user.isSignedIn === false && (
            <Link
              to="/login"
              style={{
                color: "white",
                backgroundColor: "tomato",
                borderRadius: "5px",
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              Login
            </Link>
          )}

          {/* {user.isSignedIn === true && <Nav.Link>{user.name}</Nav.Link>} */}

          {user.isSignedIn === true && (
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <button onClick={()=>handleLogOut()}>Log Out</button>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
