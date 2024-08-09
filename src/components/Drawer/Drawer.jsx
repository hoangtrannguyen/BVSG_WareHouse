import React, { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./drawer.css";

const DrawerCT = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Container
      fluid
      className={`drawer-container ${isCollapsed ? "collapsed" : ""}`}
    >
      <Container fluid className="drawer-items">
        <Nav className="nav-container">
          <div className="head">
            <span className="head-text">Hoàng Trần Nguyễn</span>
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
                <i className="bi bi-info-circle"></i> Info
              </span>
            )}
            {isCollapsed && <i className="bi bi-info-circle"></i>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Setting" className="nav-link">
            {!isCollapsed && (
              <span className="link-text">
                <i className="bi bi-gear"></i> Setting
              </span>
            )}
            {isCollapsed && <i className="bi bi-gear"></i>}
          </Nav.Link>
        </Nav>
      </Container>
    </Container>
  );
};

export default DrawerCT;
