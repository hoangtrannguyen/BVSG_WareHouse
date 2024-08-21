import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Home/Home";
import Info from "./container/Info/Info";
import Setting from "./container/Setting/Setting";
import DrawerCT from "./components/Drawer/Drawer";
import Login from "./container/Login/Login";
import Breadcrumbs from "./components/breadcrumb/Breadcrumbs";
import Shelve from "./container/Shelve/Shelve";
import User from "./container/User/User";
import { Container } from "react-bootstrap";
import ProtectedRoute from "./container/ProtectedRoute/ProtecdRoute";
import "./App.css";

const AppLayout = ({ children }) => {
  return (
    <>
      <DrawerCT />
      <div className="content-container">
        <Breadcrumbs />
        {children}
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className="app-container">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Home />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Home />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Info"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Info />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Setting"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Setting />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Shelve"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Shelve />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/User"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <User />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
