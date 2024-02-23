import { createSlice } from '@reduxjs/toolkit';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const initialState = {
  Users: {},
  CoffeeList: [],
  BeanList: [],
  CartPrice: 0,
  FavoritesList: [],
  CartList: [],
  OrderHistoryList: [],
};

export const counterSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setCoffeeList: (state, action) => {
      state.CoffeeList = action.payload;
    },
    setBeanList: (state, action) => {
      state.BeanList = action.payload;
    },
    setUsers: (state, action) => {
      state.Users = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingCartItem = state.CartList.find(item => item.id === cartItem.id);

      if (existingCartItem) {
        const existingSize = existingCartItem.prices.find(price => price.size === cartItem.prices[0].size);
        if (existingSize) {
          existingSize.quantity++;
        } else {
          existingCartItem.prices.push(cartItem.prices[0]);
        }
        existingCartItem.prices.sort((a, b) => b.size - a.size);
      } else {
        state.CartList.push(cartItem);
      }
    },
    calculateCartPrice: (state) => {
      let totalprice = 0;
      state.CartList.forEach(item => {
        let itemPrice = 0;
        item.prices.forEach(price => {
          itemPrice += parseFloat(price.price) * price.quantity;
        });
        item.ItemPrice = itemPrice.toFixed(2).toString();
        totalprice += itemPrice;
      });
      state.CartPrice = totalprice.toFixed(2).toString();
    },
    toggleFavorite: (state, action) => {
      const { type, id } = action.payload;
      const targetList = type === 'Coffee' ? state.CoffeeList : state.BeanList;
      const targetItem = targetList.find(item => item.id === id);
      if (targetItem) {
        targetItem.favourite = !targetItem.favourite;
        if (targetItem.favourite) {
          state.FavoritesList.unshift(targetItem);
        } else {
          const index = state.FavoritesList.findIndex(item => item.id === id);
          if (index !== -1) {
            state.FavoritesList.splice(index, 1);
          }
        }
      }
    },
    adjustCartItemQuantity: (state, action) => {
      const { id, size, increment } = action.payload;
      const item = state.CartList.find(item => item.id === id);
      if (item) {
        const price = item.prices.find(price => price.size === size);
        if (price) {
          if (increment) {
            price.quantity++;
          } else {
            if (price.quantity > 1) {
              price.quantity--;
            } else {
              const priceIndex = item.prices.findIndex(price => price.size === size);
              item.prices.splice(priceIndex, 1);
              if (item.prices.length === 0) {
                const itemIndex = state.CartList.findIndex(item => item.id === id);
                state.CartList.splice(itemIndex, 1);
              }
            }
          }
        }
      }
    },
    incrementCartItemQuantity: (state,action) => {
      const {id, size} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id == id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == size) {
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    decrementCartItemQuantity: (state,action) => {
      const {id, size} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id == id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == size) {
              if (state.CartList[i].prices.length > 1) {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList[i].prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    deleteFromFavoriteList:  (state,action) => {
      const {type, id} = action.payload;
      if (type == 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == true) {
              state.CoffeeList[i].favourite = false;
            } else {
              state.CoffeeList[i].favourite = true;
            }
            break;
          }
        }
      } else if (type == 'Beans') {
        for (let i = 0; i < state.BeanList.length; i++) {
          if (state.BeanList[i].id == id) {
            if (state.BeanList[i].favourite == true) {
              state.BeanList[i].favourite = false;
            } else {
              state.BeanList[i].favourite = true;
            }
            break;
          }
        }
      }
      let spliceIndex = -1;
      for (let i = 0; i < state.FavoritesList.length; i++) {
        if (state.FavoritesList[i].id == id) {
          spliceIndex = i;
          break;
        }
      }
      state.FavoritesList.splice(spliceIndex, 1);
    },
    addToFavoriteList: (state,action) => {
      const {type, id} = action.payload;
       if (type == 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == false) {
              state.CoffeeList[i].favourite = true;
              state.FavoritesList.unshift(state.CoffeeList[i]);
            } else {
              state.CoffeeList[i].favourite = false;
            }
            break;
          }
        }
      } else if (type == 'Bean') {
        for (let i = 0; i < state.BeanList.length; i++) {
          if (state.BeanList[i].id == id) {
            if (state.BeanList[i].favourite == false) {
              state.BeanList[i].favourite = true;
              state.FavoritesList.unshift(state.BeanList[i]);
            } else {
              state.BeanList[i].favourite = false;
            }
            break;
          }
        }
      }
    },
    addToOrderHistory: (state) => {
      const totalPrice = state.CartList.reduce((acc, item) => acc + parseFloat(item.ItemPrice), 0);
      state.OrderHistoryList.unshift({
        OrderDate: new Date().toLocaleString(),
        CartList: [...state.CartList],
        CartListPrice: totalPrice.toFixed(2).toString(),
      });
      state.CartList = [];
    },
  },
});

export const {
  setCoffeeList,
  setBeanList,
  addToCart,
  calculateCartPrice,
  toggleFavorite,
  adjustCartItemQuantity,
  addToOrderHistory,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  deleteFromFavoriteList,
  addToFavoriteList
} = counterSlice.actions;


export default counterSlice.reducer;
