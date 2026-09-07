import React from "react";

export default function Cart() {

  return (
    <div className="page">

      <h1>
        My Cart
      </h1>

      <div className="card empty-state">

        <h2>
          Your cart is empty
        </h2>

        <p>
          Products you select will appear here.
        </p>

      </div>

    </div>
  );
}
