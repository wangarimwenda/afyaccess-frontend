export default function ProductCard({ item, addToCart }) {
  return (
    <div className="product-card">
      <h3>{item.product}</h3>
      <p>{item.therapeutic}</p>
      <p>KSh {item.price}</p>

      <button onClick={() => addToCart(item.id)}>
        Add to Cart
      </button>
    </div>
  );
}