export default function CartItem({ item, setCart }) {

  function increase() {
    setCart(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }

  function decrease() {
    setCart(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
      )
    );
  }

  function remove() {
    setCart(prev => prev.filter(i => i.id !== item.id));
  }

  return (
    <div className="cart-item">
      <div className="cart-info">
        <h4>{item.product}</h4>
        <p>KSh {item.price}</p>
      </div>

      <div className="cart-controls">
        <button onClick={decrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={increase}>+</button>
      </div>

      <div className="cart-total">
        <strong>KSh {item.price * item.quantity}</strong>
      </div>

      <button className="remove-btn" onClick={remove}>
        Remove
      </button>
    </div>
  );
}