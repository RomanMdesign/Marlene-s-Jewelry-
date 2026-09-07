import React from "react";

import {
  Link
} from "react-router-dom";

export default function Home() {

  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            MARLENE’S JEWELRY
          </p>

          <h1>
            Jewelry Made
            <br />
            to Be Remembered.
          </h1>

          <p className="hero-description">
            Discover jewelry collections,
            services, and personalized
            customer support.
          </p>


          <div className="hero-actions">

            <Link to="/shop">

              <button className="primary-button">
                Shop Collection
              </button>

            </Link>


            <Link to="/register">

              <button className="secondary-button">
                Create Account
              </button>

            </Link>

          </div>

        </div>

      </section>


      <section className="page">

        <div className="section-heading">

          <p className="eyebrow">
            EXPLORE
          </p>

          <h2>
            Everything in one place
          </h2>

        </div>


        <div className="cards">

          <Link
            to="/shop"
            className="card"
          >
            <h3>
              Shopping Center
            </h3>

            <p>
              Explore our jewelry
              collections and products.
            </p>
          </Link>


          <Link
            to="/services"
            className="card"
          >
            <h3>
              Services
            </h3>

            <p>
              Discover jewelry-related
              services available to customers.
            </p>
          </Link>


          <Link
            to="/support"
            className="card"
          >
            <h3>
              Customer Service
            </h3>

            <p>
              Get assistance and
              communicate with our team.
            </p>
          </Link>

        </div>

      </section>

    </div>
  );
}
