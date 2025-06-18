import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveCarts = () => {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null);

  const fetchActiveCarts = async () => {
    try {
      const response = await axios.get('/api/admin/carts');
      if (Array.isArray(response.data)) {
        setCarts(response.data);
      } else {
        console.error('Received non-array response for carts:', response.data);
        setCarts([]); // Reset to empty array to prevent crash
      }
    } catch (err) {
      setError('Failed to fetch active carts. Please try again later.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActiveCarts(); // Fetch immediately on component mount
    const intervalId = setInterval(fetchActiveCarts, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="active-carts-container">
      <h2>Active Shopping Carts</h2>
      {carts.length === 0 ? (
        <p>No active carts at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.sessionId}>
                <td title={cart.sessionId}>{`${cart.sessionId.substring(0, 8)}...`}</td>
                <td>
                  {cart.items.length > 0 ? (
                    <ul>
                      {cart.items.map((item) => (
                        <li key={item._id}>
                          {item.quantity} x {item.productVariant?.product?.name || 'Unknown Product'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'Empty'
                  )}
                </td>
                <td>${cart.totalAmount.toFixed(2)}</td>
                <td>{new Date(cart.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveCarts;
