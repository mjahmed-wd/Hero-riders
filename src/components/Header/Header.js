import React, { useContext } from "react";
import { Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [user]=useContext(UserContext)
  console.log('user',user)
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Link to="/">
        <Navbar.Brand>Hero Riders</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#features">Home</Nav.Link>
          <Nav.Link href="#pricing">Destination</Nav.Link>
          <Nav.Link href="#pricing">Blog</Nav.Link>
          <Nav.Link >Contact</Nav.Link>
         {user.isSignedIn===false &&<Link to="/login" style={{color:"white",backgroundColor:"tomato",borderRadius:"5px",paddingLeft:"25px",paddingRight:"25px",paddingTop:"5px",paddingBottom:"5px"}}> Login
         </Link>}
         {user.isSignedIn===true && <Nav.Link>{user.name}</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
