import React from "react";

import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

export default function CustomerLayout() {

  const navigate = useNavigate();


  function logout() {

    localStorage.removeItem(
      "marlenes_session"
    );

    navigate("/");
  }


  return (
    <div className="portal-layout">

      <aside className="portal-sidebar">

        <div className="portal-logo">
          Marlene’s Jewelry
        </div>

        <div className="portal-label">
          Customer Portal
        </div>


        <nav>

          <Link to="/portal">
            Dashboard
          </Link>

          <Link to="/portal/account">
            Account
          </Link>

          <Link to="/portal/cart">
            Cart
          </Link>

          <Link to="/portal/orders">
            Orders
          </Link>

          <Link to="/portal/messages">
            Messages
          </Link>

          <Link to="/portal/inquiries">
            Inquiries
          </Link>

        </nav>


        <button
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>

      </aside>


      <section className="portal-content">

        <Outlet />

      </section>

    </div>
  );
}
