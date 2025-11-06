const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// EMI Calculation API
app.post("/api/calculate-emi", (req, res) => {
  const { principal, rate, tenure } = req.body;

  if (!principal || !rate || !tenure) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const P = parseFloat(principal);
  const R = parseFloat(rate) / 12 / 100;
  const N = parseInt(tenure);

  // EMI Formula
  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

  res.json({
    emi: emi.toFixed(2),
    totalAmount: (emi * N).toFixed(2),
    totalInterest: (emi * N - P).toFixed(2),
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
