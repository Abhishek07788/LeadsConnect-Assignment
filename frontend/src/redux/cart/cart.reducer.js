import {
  cartLoading,
  cartError,
  cartGet,
  getSingle,
  cartSet,
  cartDelete,
  cartUpdate,
} from "./cart.type";

const initialState = {
  cartData: [],
  singleCart: {},
  total: 0,
  loading: false,
  error: false,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case cartLoading: {
      return { ...state, loading: true, error: false };
    }

    case cartError: {
      return { ...state, loading: false, error: true };
    }

    case cartGet: {
      const total = payload.reduce((acc, el) => (acc += el.quantity), 0);
      return {
        ...state,
        loading: false,
        error: false,
        cartData: payload,
        total: total,
      };
    }

    case getSingle: {
      return { ...state, loading: false, error: false, singleCart: payload };
    }
    case cartSet: {
      return { ...state, loading: false, error: false };
    }

    case cartDelete: {
      return { ...state, loading: false, error: false };
    }

    case cartUpdate: {
      return { ...state, loading: false, error: false };
    }

    default: {
      return state;
    }
  }
};
