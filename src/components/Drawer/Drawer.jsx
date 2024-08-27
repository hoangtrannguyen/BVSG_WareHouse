import React, { useState } from "react";
import { Container, Nav, Button, Dropdown, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./drawer.css";

const DrawerCT = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

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

  const handleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
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

          {/* Home section */}
          <Nav.Link
            className="nav-link"
            onClick={() => handleExpand("home")}
            aria-expanded={expandedSection === "home"}
          >
            {!isCollapsed && (
              <span
                className="link-text"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <i className="bi bi-shop"></i> Ware House
                </span>
                <i className="bi bi-list"></i>
              </span>
            )}
            {isCollapsed && <i className="bi bi-house"></i>}
          </Nav.Link>
          <Collapse in={expandedSection === "home"}>
            <Container fluid className="draw-container">
              <Nav.Link as={NavLink} to="/Home" className="nav-link">
                {!isCollapsed && (
                  <span className="link-text">
                    <i className="bi bi-house"></i> Produce
                  </span>
                )}
                {isCollapsed && <i className="bi bi-house"></i>}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Info" className="nav-link">
                {!isCollapsed && (
                  <span className="link-text">
                    <i class="bi bi-box-seam"></i> Item shelve Manager
                  </span>
                )}
                {isCollapsed && <i className="bi bi-info-circle"></i>}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shelve" className="nav-link">
                {!isCollapsed && (
                  <span className="link-text">
                    <i class="bi bi-boxes"></i> Shelve Manager
                  </span>
                )}
                {isCollapsed && <i className="bi bi-gear"></i>}
              </Nav.Link>
            </Container>
          </Collapse>

          {/* Item shelve Manager section */}
          <Nav.Link
            className="nav-link"
            onClick={() => handleExpand("info")}
            aria-expanded={expandedSection === "info"}
          >
            {!isCollapsed && (
              <span className="link-text">
                <span>
                  <i className="bi bi-box-seam"></i> Item shelve Manager
                </span>
                <i className="bi bi-list"></i>
              </span>
            )}
            {isCollapsed && <i className="bi bi-box-seam"></i>}
          </Nav.Link>
          <Collapse in={expandedSection === "info"}>
            <Container fluid className="draw-container">
              <Nav.Link as={NavLink} to="/sub3" className="nav-link">
                Sub Link 3
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sub4" className="nav-link">
                Sub Link 4
              </Nav.Link>
            </Container>
          </Collapse>

          {/* Shelve Manager section */}
          <Nav.Link
            className="nav-link"
            onClick={() => handleExpand("shelve")}
            aria-expanded={expandedSection === "shelve"}
          >
            {!isCollapsed && (
              <span className="link-text">
                <span>
                  <i className="bi bi-boxes"></i> Shelve Manager
                </span>
                <i className="bi bi-list"></i>
              </span>
            )}
            {isCollapsed && <i className="bi bi-boxes"></i>}
          </Nav.Link>

          <Collapse in={expandedSection === "shelve"}>
            <Container fluid className="draw-container">
              <Nav.Link as={NavLink} to="/sub5" className="nav-link">
                Sub Link 5
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sub6" className="nav-link">
                Sub Link 6
              </Nav.Link>
            </Container>
          </Collapse>

          {/* Các NavLink khác ở đây */}

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
