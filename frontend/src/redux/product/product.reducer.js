import {
  getSingle,
  productLoading,
  productError,
  productGet,
} from "./product.type";

const initialState = {
  productData: [],
  singleProduct: {},
  Loading: false,
  Error: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case productLoading: {
      return { ...state, Loading: true, Error: false };
    }

    case productError: {
      return { ...state, Loading: false, Error: true };
    }

    case productGet: {
      return { ...state, Loading: false, Error: false, productData: payload };
    }

    case getSingle: {
      return { ...state, Loading: false, Error: false, singleProduct: payload };
    }

    default: {
      return state;
    }
  }
};
