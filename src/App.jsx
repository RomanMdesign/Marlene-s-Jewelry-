import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import EditorLayout from "./layouts/EditorLayout";

import Home from "./pages/public/Home";
import ShoppingCenter from "./pages/public/ShoppingCenter";
import Services from "./pages/public/Services";
import CustomerService from "./pages/public/CustomerService";
import Inquiries from "./pages/public/Inquiries";

import CustomerDashboard from "./pages/customer/Dashboard";
import Account from "./pages/customer/Account";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Messages from "./pages/customer/Messages";
import CustomerInquiries from "./pages/customer/CustomerInquiries";

import EditorDashboard from "./pages/editor/Dashboard";
import WebsiteEditor from "./pages/editor/WebsiteEditor";
import Products from "./pages/editor/Products";
import Categories from "./pages/editor/Categories";
import EditorServices from "./pages/editor/Services";
import HomePage from "./pages/editor/HomePage";
import EditorMessages from "./pages/editor/Messages";
import EditorInquiries from "./pages/editor/Inquiries";
import EditorOrders from "./pages/editor/Orders";
import Customers from "./pages/editor/Customers";
import Media from "./pages/editor/Media";
import Navigation from "./pages/editor/Navigation";
import Announcements from "./pages/editor/Announcements";
import WebsiteSettings from "./pages/editor/WebsiteSettings";
import ActivityLog from "./pages/editor/ActivityLog";


/* -----------------------------
   SESSION HELPERS
----------------------------- */

function getSession() {
  try {
    return JSON.parse(
      localStorage.getItem("marlenes_session") || "null"
    );
  } catch {
    return null;
  }
}


/* -----------------------------
   CUSTOMER GUARD
----------------------------- */

function CustomerGuard({ children }) {
  const session = getSession();

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* -----------------------------
   EDITOR GUARD
----------------------------- */

function EditorGuard({ children }) {
  const session = getSession();

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (session.role !== "editor") {
    return (
      <Navigate
        to="/portal"
        replace
      />
    );
  }

  return children;
}


/* -----------------------------
   LOGIN
----------------------------- */

function Login() {

  function loginCustomer() {

    localStorage.setItem(
      "marlenes_session",
      JSON.stringify({
        name: "Customer",
        email: "customer@example.com",
        role: "customer"
      })
    );

    window.location.href = "/portal";
  }


  function loginEditor() {

    localStorage.setItem(
      "marlenes_session",
      JSON.stringify({
        name: "Administrator",
        email: "admin@marlenes-jewelry.com",
        role: "editor"
      })
    );

    window.location.href = "/editor";
  }


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">
          Marlene’s Jewelry
        </div>

        <h1>Welcome Back</h1>

        <p>
          Log in to access your account.
        </p>

        <button
          onClick={loginCustomer}
          className="primary-button"
        >
          Customer Login
        </button>

        <button
          onClick={loginEditor}
          className="secondary-button"
        >
          Editor Login
        </button>

        <div className="auth-links">

          <a href="/register">
            Create New Account
          </a>

          <a href="/">
            Back to Website
          </a>

        </div>

      </div>

    </div>
  );
}


/* -----------------------------
   REGISTER
----------------------------- */

function Register() {

  function createAccount() {

    localStorage.setItem(
      "marlenes_session",
      JSON.stringify({
        name: "New Customer",
        email: "customer@example.com",
        role: "customer"
      })
    );

    window.location.href = "/portal";
  }


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">
          Marlene’s Jewelry
        </div>

        <h1>Create New Account</h1>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          onClick={createAccount}
          className="primary-button"
        >
          Create Account
        </button>

        <div className="auth-links">

          <a href="/login">
            Already have an account?
          </a>

          <a href="/">
            Back to Website
          </a>

        </div>

      </div>

    </div>
  );
}


/* -----------------------------
   APP ROUTES
----------------------------- */

export default function App() {

  return (
    <Routes>

      {/* PUBLIC WEBSITE */}

      <Route
        element={<PublicLayout />}
      >

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<ShoppingCenter />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/support"
          element={<CustomerService />}
        />

        <Route
          path="/inquiries"
          element={<Inquiries />}
        />

      </Route>


      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* CUSTOMER PORTAL */}

      <Route
        path="/portal"
        element={
          <CustomerGuard>
            <CustomerLayout />
          </CustomerGuard>
        }
      >

        <Route
          index
          element={<CustomerDashboard />}
        />

        <Route
          path="account"
          element={<Account />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="messages"
          element={<Messages />}
        />

        <Route
          path="inquiries"
          element={<CustomerInquiries />}
        />

      </Route>


      {/* EDITOR PORTAL */}

      <Route
        path="/editor"
        element={
          <EditorGuard>
            <EditorLayout />
          </EditorGuard>
        }
      >

        <Route
          index
          element={<EditorDashboard />}
        />

        <Route
          path="website"
          element={<WebsiteEditor />}
        />

        <Route
          path="home"
          element={<HomePage />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="categories"
          element={<Categories />}
        />

        <Route
          path="services"
          element={<EditorServices />}
        />

        <Route
          path="messages"
          element={<EditorMessages />}
        />

        <Route
          path="inquiries"
          element={<EditorInquiries />}
        />

        <Route
          path="orders"
          element={<EditorOrders />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="media"
          element={<Media />}
        />

        <Route
          path="navigation"
          element={<Navigation />}
        />

        <Route
          path="announcements"
          element={<Announcements />}
        />

        <Route
          path="settings"
          element={<WebsiteSettings />}
        />

        <Route
          path="activity"
          element={<ActivityLog />}
        />

      </Route>


      {/* UNKNOWN ROUTE */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}
