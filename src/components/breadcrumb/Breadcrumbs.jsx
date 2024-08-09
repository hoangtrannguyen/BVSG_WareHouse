import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import "./breadcrimbs.css"; // Import CSS đã tạo

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Trang chủ
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return index === pathnames.length - 1 ? (
          <Breadcrumb.Item active key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
