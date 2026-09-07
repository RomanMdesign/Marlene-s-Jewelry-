import React from "react";

import {
  Link
} from "react-router-dom";

export default function CustomerService() {

  return (
    <div className="page">

      <div className="page-heading">

        <p className="eyebrow">
          SUPPORT
        </p>

        <h1>
          Customer Service
        </h1>

        <p>
          We are here to help.
        </p>

      </div>


      <div className="card">

        <h2>
          How can we help?
        </h2>

        <p>
          For questions, concerns,
          orders, and assistance,
          contact Marlene’s Jewelry
          through the inquiry system.
        </p>


        <Link to="/inquiries">

          <button className="primary-button">
            Send an Inquiry
          </button>

        </Link>

      </div>

    </div>
  );
}
