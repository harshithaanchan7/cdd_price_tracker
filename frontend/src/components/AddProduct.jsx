
function AddProduct({ onAddProduct, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const product = {
      product_url: formData.get("product_url"),
      target_price: Number(formData.get("target_price")),
      // Send null (not "") when left empty so the backend accepts it
      notify_email: formData.get("notify_email")?.trim() || null,
    };

    onAddProduct(product);
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2>Add New Product</h2>
        <p>Enter the product details to start tracking its price.</p>

        <form onSubmit={handleSubmit}>
          <label>Product URL</label>
          <input
            type="url"
            name="product_url"
            placeholder="Paste product URL"
            required
          />

          <label>Target Price (₹)</label>
          <input
            type="number"
            name="target_price"
            placeholder="Enter your target price"
            min="1"
            required
          />

          <label>Email for price-drop alert (optional)</label>
          <input
            type="email"
            name="notify_email"
            placeholder="you@example.com"
          />

          <div className="add-product-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit">
              Start Tracking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
