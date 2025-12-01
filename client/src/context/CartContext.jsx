/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [], // each: { _id, title, price, image, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(i => i._id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload._id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart: product => dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: id =>
      dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    updateQuantity: (_id, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
