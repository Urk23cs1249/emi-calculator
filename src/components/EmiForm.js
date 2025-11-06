import React, { useState } from "react";

function EmiForm() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!principal || !rate || !tenure) {
      alert("Please fill all fields");
      return;
    }

    const response = await fetch("http://localhost:5000/api/calculate-emi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ principal, rate, tenure }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter loan amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Loan Tenure (Months)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number of months"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Calculate EMI
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center">
          <h5>Monthly EMI: ₹{result.emi}</h5>
          <p>Total Amount: ₹{result.totalAmount}</p>
          <p>Total Interest: ₹{result.totalInterest}</p>
        </div>
      )}
    </div>
  );
}

export default EmiForm;
