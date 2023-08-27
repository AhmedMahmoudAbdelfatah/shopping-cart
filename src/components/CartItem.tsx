import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from "../data/items.json"
import { formatCurrency } from '../utils/formatCurrency';


type cartItemProps = {
  id: number,
  quantity: number,

}

export const CartItem = (props:cartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find(item => item.id === props.id);
  if (item === null || item === undefined) return null;

  return (
    <Stack direction='horizontal' gap={2}>
      <img src={item.imgUrl} alt="cart-image" style={{ width: "125px", height: "75px", objectFit: "cover" }} />
      <div className="me-auto">
        <div>
          {item?.name}
          {props.quantity > 1 && (
            <span className='text-muted' style={{ fontSize: "0.65rem", marginLeft: "0.25rem" }}>x{props.quantity}</span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: ".75rem" }}>{ formatCurrency(item.price) }</div>
      </div>
      <div>{formatCurrency(item.price * props.quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={()=> removeFromCart(props.id)}>&times;</Button>
    </Stack>
  )
}
