// import React from "react";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
// import axios from "axios";
import axios from "../utils/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filterProducts, setfilterProducts] = useState(null);

  const getproductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      // console.log(data);
      setfilterProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterProducts || category == "undefined") setfilterProducts(products);
    if (category != "undefined") getproductCategory();
    // setfilterProducts(products.filter((p) => p.category == category));
  }, [category, products]);

  console.log(filterProducts);

  return products ? (
    <>
      <Nav />
      <div className="h-full w-[85%]  p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterProducts &&
          filterProducts.map((p, i) => (
            <Link
              to={`/details/${p.id}`}
              key={p.id}
              className=" card mr-3  w-[18%] h-[30vh] flex flex-col rounded-md mb-3 p-3 border shadow-lg"
            >
              <div
                className="mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center hover:scale-110"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-400">{p.title}</h1>
            </Link>
          ))}
        ;
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
