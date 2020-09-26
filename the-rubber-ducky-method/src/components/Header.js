import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase';
import { withFirestore } from "react-redux-firebase";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';


function Header(props) {
  const history = useHistory();
  const firestore = useFirestore();

  async function handleSearchQuery(event) {
    event.preventDefault();
    const propertiesToQuery = event.target.title.value.toLowerCase();
    
    const propertiesToQuery2 = event.target.scents.value.toLowerCase();
// .where("scents".toLowerCase(), "==", propertiesToQuery2)

    const snapshot = await firestore.collection('memories').where("title", ">=", propertiesToQuery).where("title", "<=", propertiesToQuery2).where("title", "<=", propertiesToQuery2)
    .get();
    if (snapshot.empty) {
      console.log("no matches");
      return;
    }
    // const snapshot2 = await firestore.collection('memories').where("scents", ">=", propertiesToQuery)
    // .get();
    // if (snapshot.empty) {
    //   console.log("no matches");
    //   return;
    // }

    const memory = snapshot.docs.map(doc => {
      const documentId = doc.id;
      const myObj = {documentId, ...doc.data()};
      return myObj;
    });

    // const memory2 = snapshot2.docs.map(doc => {
    //   const documentId = doc.id;
    //   const myObj = {documentId, ...doc.data()};
    //   return myObj;
    // });

    // const memory3 = {memory, ...memory2};

    // console.log(memory3);
    props.onSearchQuery(memory);
  }

  function doSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successfully signed out!");
        history.push("/");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  return (
    <React.Fragment>
      <Navbar
        style={{
          backgroundColor: "rgba(255, 255, 255, .5)",
          boxShadow: "0 5px 15px rgba(0, 0, 0, .5)",
        }}
        sticky="top"
        expand="lg"
      >
        <Navbar.Brand as={Link} to="/">
          Memory Lane
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/signin">
              Sign-in
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={handleSearchQuery}>
            <Form.Control
              type="text"
              name="title"
              placeholder="title"
              className="mr-sm-2"
            />
            <Form.Control
              type="text"
              name="scents"
              placeholder="scents"
              className="mr-sm-2"
            />
            <Button variant="success" type='submit'>Search</Button>
          </Form>
          <Form inline>
            <Button onClick={doSignOut} variant="success" className="ml-2">
              Sign Out
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onSearchQuery: PropTypes.func,
  doSignOut: PropTypes.func
}

export default withFirestore(Header);