import React from "react";

export default function ShoppingCenter() {

  return (
    <div className="page">

      <div className="page-heading">

        <p className="eyebrow">
          MARLENE’S JEWELRY
        </p>

        <h1>
          Shopping Center
        </h1>

        <p>
          Browse our jewelry collections.
        </p>

      </div>


      <div className="cards">

        <div className="card">

          <div className="product-placeholder">
            Jewelry
          </div>

          <h2>
            Jewelry Collection
          </h2>

          <p>
            Products will appear here.
          </p>

          <button className="primary-button">
            View Products
          </button>

        </div>


        <div className="card">

          <div className="product-placeholder">
            Featured
          </div>

          <h2>
            Featured Jewelry
          </h2>

          <p>
            Featured products will appear here.
          </p>

          <button className="primary-button">
            Explore
          </button>

        </div>

      </div>

    </div>
  );
}
