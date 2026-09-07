import React from "react";

import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

export default function EditorLayout() {

  const navigate = useNavigate();


  function logout() {

    localStorage.removeItem(
      "marlenes_session"
    );

    navigate("/");
  }


  return (
    <div className="portal-layout">

      <aside className="editor-sidebar">

        <div className="portal-logo">
          Marlene’s Jewelry
        </div>

        <div className="portal-label">
          Editor Portal
        </div>


        <nav>

          <Link to="/editor">
            Dashboard
          </Link>

          <Link to="/editor/website">
            Website Editor
          </Link>

          <Link to="/editor/home">
            Home Page
          </Link>

          <Link to="/editor/products">
            Products
          </Link>

          <Link to="/editor/categories">
            Categories
          </Link>

          <Link to="/editor/services">
            Services
          </Link>

          <Link to="/editor/messages">
            Messages
          </Link>

          <Link to="/editor/inquiries">
            Inquiries
          </Link>

          <Link to="/editor/orders">
            Orders
          </Link>

          <Link to="/editor/customers">
            Customers
          </Link>

          <Link to="/editor/media">
            Media
          </Link>

          <Link to="/editor/navigation">
            Navigation
          </Link>

          <Link to="/editor/announcements">
            Announcements
          </Link>

          <Link to="/editor/settings">
            Website Settings
          </Link>

          <Link to="/editor/activity">
            Activity Log
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
