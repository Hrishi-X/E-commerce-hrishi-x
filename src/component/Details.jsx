import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "../utils/Axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);

  const [product, setproduct] = useState(null);
  const { id } = useParams();
  console.log(id);

  const deleteButtonHandler = () => {
    const filterProducts = products.filter((p) => p.id !== id);
    setproducts(filterProducts);
    localStorage.setItem("products", JSON.stringify(filterProducts));
    navigate("/");
  };

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     console.log(data);
  //     setproduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProduct();
  }, []);
  return product ? (
    <div className="w-[80%] h-full m-auto p-[10%] flex px-[5%] items-center">
      <img
        className="w-[40%] h-[80%] object-contain "
        src={`${product.image}`}
        alt=""
      />
      <div className=" content w-[50%] ">
        <h1 className=" text-4xl ">{product.title}</h1>
        <h3 className="text-zinc-400 my-2">{product.category}</h3>
        <h2 className="text-red-400 p-4">${product.price}</h2>
        <p className="mb-[5%]">{product.description}</p>
        <Link className="border-4 py-2 border-blue-200 rounded-md px-5  ">
          Edit
        </Link>
        <button
          onClick={() => deleteButtonHandler(product.id)}
          className="border-4 py-2 border-red-200 rounded-md px-5  text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
