import React from "react";

import {
  Link
} from "react-router-dom";

export default function Dashboard() {

  return (
    <div className="page">

      <div className="page-heading">

        <p className="eyebrow">
          ADMINISTRATION
        </p>

        <h1>
          Editor Dashboard
        </h1>

        <p>
          Manage the Marlene’s Jewelry website.
        </p>

      </div>


      <div className="cards">

        <Link to="/editor/products" className="card">
          <h2>Products</h2>
          <p>Manage jewelry products.</p>
        </Link>

        <Link to="/editor/orders" className="card">
          <h2>Orders</h2>
          <p>Manage customer orders.</p>
        </Link>

        <Link to="/editor/customers" className="card">
          <h2>Customers</h2>
          <p>Manage customers.</p>
        </Link>

        <Link to="/editor/messages" className="card">
          <h2>Messages</h2>
          <p>Manage customer messages.</p>
        </Link>

      </div>

    </div>
  );
}
