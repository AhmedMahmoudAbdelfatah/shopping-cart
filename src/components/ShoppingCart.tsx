import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utils/formatCurrency"
import storeItems from "../data/items.json"


type ShoppingCartProps = {
  isOpen: boolean
}

export const ShoppingCart = (props: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const totalPrice = storeItems.reduce((total, item) =>
    total + ((cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0) * item.price)
    , 0
  );
  return (
    <Offcanvas show={props.isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5" >
            Total {formatCurrency(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
