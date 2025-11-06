import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmiForm from "./components/EmiForm";

function App() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary mb-4">EMI Calculator</h2>
        <EmiForm />
      </div>
    </div>
  );
}

export default App;
