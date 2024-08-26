import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  PaymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const OrderSlide = createSlice({
  name: "orderProduct",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item?.product === orderItem?.product
      );

      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    IncreaseAmountOrder: (state, action) => {
      const orderItemID = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item?.product === orderItemID
      );
      itemOrder.amount += 1;
    },
    DecreaseAmountOrder: (state, action) => {
      const orderItemID = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item?.product === orderItemID
      );
      itemOrder.amount -= 1;
    },
    removeOrder: (state, action) => {
      const orderItemId = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.product !== orderItemId
      );
    },
    removeManyOrder: (state, action) => {
      const orderItemIdArr = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => !orderItemIdArr.includes(item.product)
      );
    },
  },
});

export const {
  addOrder,
  IncreaseAmountOrder,
  DecreaseAmountOrder,
  removeOrder,
  removeManyOrder,
} = OrderSlide.actions;

export default OrderSlide.reducer;
