export default function CartItem({
  item,
  removeFromCart,
  changeQty,
}) {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.product}</h3>
        <p>KSh {item.price}</p>
      </div>

      <div className="cart-controls">
        <button onClick={() => changeQty(item.id, -1)}>
          -
        </button>

        <span>{item.quantity}</span>
   
   
        <button onClick={() => changeQty(item.id, 1)}>
          +
        </button>

        <button
          onClick={() => {
            if (
              window.confirm(
                "Remove this item from your cart?"
              )
            ) {
              removeFromCart(item.id);
            }
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}