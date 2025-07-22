"use client";
import { useEffect, useState } from "react";

const QuantitiesPage = () => {
  const [pincode, setPincode] = useState("");
  const [items, setItems] = useState<any[]>([]); // Ensure it's always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuantities = async () => {
    if (!pincode) {
      setError("Please enter a valid pincode");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/qts?pincode=${pincode}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored in localStorage
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch data");

      setItems(data.products || []); // Ensure correct field is used
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Check Product Availability</h1>

      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button
          onClick={fetchQuantities}
          className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        >
          Check Availability
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {items.length > 0 ? ( // Check array length safely
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Item</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.itemId}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹{item.price || "N/A"}</td> {/* Handle missing price */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products available for this pincode.</p>
        )}
      </div>
    </div>
  );
};

export default QuantitiesPage;
