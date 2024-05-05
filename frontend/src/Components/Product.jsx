import React from "react";

const Product = ({ id,name,description,price}) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>
        <button type="button" className="btn btn-danger">Delete</button>
        <button type="button" className="btn btn-success ms-1">Finished</button>
      </td>
    </tr>
  );
};

export default Product;
