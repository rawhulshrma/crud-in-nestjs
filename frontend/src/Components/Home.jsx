import React, { useState, useEffect } from "react";
import { addProduct, deleteProduct } from "../actions/user";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./Home.css";

const Container = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? "#333" : "#fff")};
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#333")};
`;

const Home = ({ darkMode }) => {
  const { message, error, loading } = useSelector((state) => state.update);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]); // Initialize state for products

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      alert.error("All fields are required.");
      return;
    }
    await dispatch(addProduct(name, description, price));
    setName("");
    setDescription("");
    setPrice("");
    fetchProducts(); // Fetch updated products after adding a new one
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteProduct(id));
    fetchProducts(); // Fetch updated products after deleting one
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, message, dispatch]);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/products'); // Replace with your API URL
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="vh-100" style={{ background: 'linear-gradient(to right, #e43a15, #e65245)' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form className="row g-3 justify-content-center align-items-center mb-4 pb-2" onSubmit={submitHandler}>
                    <div className="col-sm">
                      <div className="form-outline">
                        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        <label className="form-label" htmlFor="name">Enter a Task Here</label>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-outline">
                        <input type="text" id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label className="form-label" htmlFor="description">Enter a Description here</label>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-outline">
                        <input type="number" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <label className="form-label" htmlFor="price">Enter a Price here</label>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary">Add Task</button>
                    </div>
                  </form>
                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>
                            <button type="button" onClick={() => deleteHandler(product._id)} className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
