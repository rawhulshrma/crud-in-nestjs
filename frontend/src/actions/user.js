import axios from "axios";

export const addProduct = (name, description, price) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_PRODUCT_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/products", // Correct API endpoint
      { name, description, price },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ADD_PRODUCT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_PRODUCT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_PRODUCT_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/products/${id}`); // Correct API endpoint

    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAILURE",
      payload: error.response.data.message,
    });
  }
};
