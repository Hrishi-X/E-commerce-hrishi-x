import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);

  const [image, setimage] = useState("");
  const [title, settitle] = useState();
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (!title || !category || !description || !price) {
      alert("Each and every input must be filed");
      return;
    }

    const newProduct = {
      id: nanoid(),
      image,
      title,
      category,
      description,
      price,
    };
    setproducts([...products, newProduct]);
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    toast.success("Product Added Successfuly");
    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="p-[5%] w-screen h-screen mt-9 flex flex-col items-center"
      action=""
    >
      <h1 className="text-blue-300 mb-4 font-semibold  text-3xl w-1/2">
        Add New Product
      </h1>
      <input
        type="url"
        placeholder="Image Link"
        className=" text-3xl bg-zinc-200 rounded-sm p-3 
        w-1/2 mb-3
     "
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className=" text-3xl bg-zinc-200 rounded-sm p-3 
        w-1/2 mb-3
     "
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Category"
          className=" text-3xl bg-zinc-200 rounded-sm p-3 
        w-[48%] mb-3
     "
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className=" text-3xl bg-zinc-200 rounded-sm p-3 
        w-[48%] mb-3 ml-2    "
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className=" text-3xl bg-zinc-200 rounded-sm p-3 
        w-1/2 mb-3
     "
        placeholder="Enter Product Description Here"
        id=""
        rows="10"
      ></textarea>
      <button
        href="/create"
        className="border-4 py-2 border-blue-200 rounded-md px-5  "
      >
        {" "}
        Add new Product
      </button>
    </form>
  );
};

export default Create;
