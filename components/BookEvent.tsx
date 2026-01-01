"use client";

import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for booking this event</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
