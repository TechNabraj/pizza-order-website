export default function TrackOrder() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ color: "red" }}>Track Order Page</h1>
      <p>Enter your order ID to track your pizza 🍕</p>
      <input type="text" placeholder="Order ID" style={{ padding: "10px", margin: "10px" }} />
      <button style={{ padding: "10px 20px" }}>Track</button>
    </div>
  );
}
