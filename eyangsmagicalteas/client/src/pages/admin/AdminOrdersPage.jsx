import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../store/orderSlice'; // Adjust path if needed
// import './AdminOrdersPage.scss'; // Optional: for styling

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { allOrders, fetchAllStatus, fetchAllError } = useSelector((state) => state.order);

  useEffect(() => {
    // Fetch orders only if they haven't been fetched yet or if status is idle/failed
    if (fetchAllStatus === 'idle' || fetchAllStatus === 'failed') {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, fetchAllStatus]);

  if (fetchAllStatus === 'loading') {
    return <div className="admin-orders-page"><p>Loading orders...</p></div>;
  }

  if (fetchAllError) {
    return <div className="admin-orders-page"><p>Error fetching orders: {fetchAllError}</p></div>;
  }

  if (fetchAllStatus === 'succeeded' && allOrders.length === 0) {
    return <div className="admin-orders-page"><p>No orders found.</p></div>;
  }

  return (
    <div className="admin-orders-page">
      <h1>Admin - All Orders</h1>
      {/* We'll add a table or list here to display orders */}
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

export default AdminOrdersPage;
