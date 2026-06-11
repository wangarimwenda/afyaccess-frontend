export default function ProductCard({ item, addToCart }) {
  return (
    <div className="product-card">
      <h3>{item.product}</h3>
      <p><strong>Category:</strong> {item.therapeutic}</p>
      <p><strong>Type:</strong> {item.inn}</p>
      <p><strong>Price:</strong> KSh {item.price}</p>

      <button onClick={() => addToCart(item.id)}>
        Add to Cart
      </button>
    </div>
  );
}