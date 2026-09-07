import React from "react";

import {
  Link
} from "react-router-dom";

export default function Dashboard() {

  return (
    <div className="page">

      <div className="page-heading">

        <p className="eyebrow">
          CUSTOMER PORTAL
        </p>

        <h1>
          Welcome to Marlene’s Jewelry
        </h1>

        <p>
          Manage your account, cart,
          orders, messages, and inquiries.
        </p>

      </div>


      <div className="cards">

        <Link
          to="/portal/account"
          className="card"
        >
          <h2>Account</h2>
          <p>
            Manage your customer information.
          </p>
        </Link>


        <Link
          to="/portal/cart"
          className="card"
        >
          <h2>Cart</h2>
          <p>
            View items in your shopping cart.
          </p>
        </Link>


        <Link
          to="/portal/orders"
          className="card"
        >
          <h2>Orders</h2>
          <p>
            View your orders and order status.
          </p>
        </Link>


        <Link
          to="/portal/messages"
          className="card"
        >
          <h2>Messages</h2>
          <p>
            Communicate with customer service.
          </p>
        </Link>

      </div>

    </div>
  );
}
