import React, { useState } from "react";
import newsletterService from "../services/newsletterService";

const NewsletterSignup = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const payload = { email, consent: true };
      const res = await newsletterService.subscribe(payload);
      if (res && res.message === "Already subscribed") {
        setStatus("success");
        setMessage("You're already subscribed. Thank you!");
      } else {
        setStatus("success");
        setMessage("Thanks for subscribing!");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.error || "Subscription failed. Try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>
      <div className="relative overflow-hidden rounded-md shadow-lg">
        {/* Background colored panel using the palette */}
        <div className="bg-secondary px-4 py-6 sm:px-8 sm:py-6">
          <div className="mx-auto flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <span className="bg-surface text-text mb-1 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Stay connected
              </span>

              <h2 className="text-on-dark mt-2 text-2xl font-extrabold sm:text-3xl">
                Sign up for our newsletter
              </h2>
              <p className="text-on-dark mt-1 text-sm">
                Get helpful tips, updates, and exclusive offers straight to your
                inbox. Only one email a week.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto">
              <div className="relative mt-2 flex w-full items-center justify-center md:mt-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-surface text-text placeholder:text-muted w-full min-w-[320px] rounded-full px-5 py-3 pr-28 text-sm shadow-inner"
                  aria-label="Email address"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="text-on-dark absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-2 text-sm font-semibold shadow-md disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>

          {status === "success" && (
            <div
              className="mt-4 text-center text-sm text-green-200"
              role="status"
            >
              {message}
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 text-center text-sm text-red-200" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
