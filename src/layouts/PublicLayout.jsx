import React from "react";

import {
  Link,
  Outlet
} from "react-router-dom";

export default function PublicLayout() {

  return (
    <>

      <header className="main-header">

        <Link
          to="/"
          className="brand"
        >
          Marlene’s Jewelry
        </Link>


        <nav className="public-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shopping Center
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/support">
            Customer Service
          </Link>

          <Link to="/inquiries">
            Inquiries
          </Link>

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

        </nav>

      </header>


      <main>
        <Outlet />
      </main>


      <footer className="main-footer">

        <strong>
          Marlene’s Jewelry
        </strong>

        <p>
          Online Jewelry Shopping & Services
        </p>

      </footer>

    </>
  );
}
