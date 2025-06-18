import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../store/orderSlice';
import './OrdersList.scss'; // Import the SCSS file

export const OrdersList = () => { // Ensure named export matches App.jsx import
  const dispatch = useDispatch();
  // Assuming orderSlice is mounted at 'order' in your root reducer
  const { allOrders, fetchAllStatus, fetchAllError } = useSelector((state) => state.order);

  useEffect(() => {
    if (fetchAllStatus === 'idle' || fetchAllStatus === 'failed') {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, fetchAllStatus]);

  if (fetchAllStatus === 'loading') {
    return <div className="orders-list-container"><p>Loading orders...</p></div>;
  }

  if (fetchAllError) {
    return <div className="orders-list-container"><p>Error fetching orders: {fetchAllError}</p></div>;
  }

  if (fetchAllStatus === 'succeeded' && allOrders.length === 0) {
    return <div className="orders-list-container"><p>No orders found.</p></div>;
  }

  return (
    <div className="orders-list-container">
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.productName} ({item.variantDescription}) - ${item.pricePaid.toFixed(2)} each
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Default export is not needed if App.jsx uses named import: import { OrdersList } ...
// export default OrdersList;
