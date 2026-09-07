import React, {
  useState
} from "react";

export default function Inquiries() {

  const [
    submitted,
    setSubmitted
  ] = useState(false);


  function submitInquiry(event) {

    event.preventDefault();

    setSubmitted(true);
  }


  return (
    <div className="page">

      <div className="page-heading">

        <p className="eyebrow">
          CONTACT
        </p>

        <h1>
          Inquiries
        </h1>

      </div>


      {submitted ? (

        <div className="success-card">

          <h2>
            Inquiry Received
          </h2>

          <p>
            Thank you for contacting
            Marlene’s Jewelry.
          </p>

          <button
            className="primary-button"
            onClick={() => setSubmitted(false)}
          >
            Send Another Inquiry
          </button>

        </div>

      ) : (

        <form
          className="card form-card"
          onSubmit={submitInquiry}
        >

          <input
            required
            type="text"
            placeholder="Your Name"
          />

          <input
            required
            type="email"
            placeholder="Email Address"
          />

          <textarea
            required
            rows="7"
            placeholder="Write your inquiry..."
          />

          <button
            type="submit"
            className="primary-button"
          >
            Submit Inquiry
          </button>

        </form>

      )}

    </div>
  );
}
