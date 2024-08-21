import React, { useState } from "react";
import { Container, Nav, Button, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./drawer.css";

const DrawerCT = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const token = Cookies.get("token");

  let username = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.fullName;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    window.location.href = "/login";
  };

  return (
    <Container
      fluid
      className={`drawer-container ${isCollapsed ? "collapsed" : ""}`}
    >
      <Container fluid className="drawer-items">
        <Nav className="nav-container">
          <div className="head">
            <span className="head-text">Welcome {username}</span>
            <Button
              variant="light"
              className="toggle-button"
              onClick={handleToggle}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <i
                className={`bi ${
                  isCollapsed ? "bi-arrow-right" : "bi-arrow-left"
                }`}
              />
            </Button>
          </div>

          {/* Existing NavLinks here */}

          <Nav.Link as={NavLink} to="/Home" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-house"></i> Home
              </span>
            )}
            {isCollapsed && <i className="bi bi-house"></i>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Info" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-info-circle"></i> Create QR Code
              </span>
            )}
            {isCollapsed && <i className="bi bi-info-circle"></i>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/shelve" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-gear"></i> Shelve Manager
              </span>
            )}
            {isCollapsed && <i className="bi bi-gear"></i>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/user" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-gear"></i> User Manager
              </span>
            )}
            {isCollapsed && <i className="bi bi-gear"></i>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Setting" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-gear"></i> Setting
              </span>
            )}
            {isCollapsed && <i className="bi bi-gear"></i>}
          </Nav.Link>

          {/* Account Manager Dropdown */}
          <Dropdown className="dropdown">
            <Dropdown.Toggle className="dropdown">
              <i className=""></i> {!isCollapsed && "Account"}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Container>
  );
};

export default DrawerCT;
