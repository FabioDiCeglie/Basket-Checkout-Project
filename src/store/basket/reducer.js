const initialState = {
  total: 0,
  numberOfItems: 0,
  items: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "basket/add": {
      const product = action.payload;
      const id = product.sku;
      const basketLimit = product.basketLimit;

      // const { sku: id, basketLimit } = product;

      const newItems = {
        ...state.items,
      };


      if (!newItems[id]) {
        newItems[id] = {
          product,
          qty: 1,
        };
      } else {
        const currentQty = newItems[id].qty;
        if (currentQty < basketLimit) {
          newItems[id] = {
            product,
            qty: currentQty + 1,
          };
        }
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case "basket/remove": {
      const product = action.payload;
      const id = product.sku;

      const newItems = state.items;

      if (!newItems[id]) {
        return state;
      } else {
        const currentQty = newItems[id].qty;
        if (currentQty === 1) {
          newItems[id] = undefined;
        } else {
          newItems[id] = {
            product,
            qty: currentQty - 1,
          };
        }
      }

      return {
        ...state,
        items: newItems,
      };
    }
    case "basket/updateTotals": {
      const basketItems = Object.values(state.items);
      console.log(basketItems)



      let total = 0;
      let numberOfItems = 0;

      // NOTE: the right way of doing it is using array reduce but I'm not yet comfortable with it

      basketItems.map((basketItem) => {
        if (basketItem) {
          const {
            qty,
            product: { price },
          } = basketItem;

          numberOfItems += qty;
          total += price * qty;

        }
      });

      return {
        ...state,
        total: total.toFixed(2),
        numberOfItems,
      };
    }
    default: {
      return state;
    }
  }
};
