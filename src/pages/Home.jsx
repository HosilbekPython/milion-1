import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleLike } from "../redux/likeSlice"; // Redux slice faylini import qiling

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(194);
  const [uillimit, setUilimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likedProducts = useSelector((state) => state.likes.likedProducts);

  const categories = [...new Set(products.map((item) => item.category))];

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products?limit=${limit}`)
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);

  const increaseLimit = () => {
    setUilimit(limit);
  };

  const handleCategoryClick = (category) => {
    if (category === "Barchasi") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  const handleNavi = (product) => {
    navigate("/full", { state: { product } });
  };

  const SkeletonLoader = () => (
    <div className="max-w-xs border rounded-lg shadow-lg animate-pulse">
      <div className="h-48 bg-gray-300 rounded-md"></div>
      <div className="p-2">
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <ul className="list-none flex overflow-x-auto whitespace-nowrap gap-3 p-2">
        <li
          className="text-gray-700 font-medium bg-gray-200 px-3 py-1 rounded-lg cursor-pointer"
          onClick={() => handleCategoryClick("Barchasi")}
        >
          Barchasi
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className="text-gray-700 font-medium bg-gray-200 px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-medium mb-2 text-gray-800 text-center">Mahsulotlar</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {loading
          ? Array.from({ length: uillimit }).map((_, index) => <SkeletonLoader key={index} />)
          : filteredProducts.slice(0, uillimit).map((product) => {
              const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
              const isLiked = likedProducts.includes(product.id); // Liked statusini tekshiramiz
              return (
                <div key={product.id} className="relative max-w-xs border rounded-lg shadow-lg cursor-pointer">
                  <button
                    onClick={() => dispatch(toggleLike(product.id))}
                    className="absolute z-50 top-2 right-2 text-yellow-400 text-xl"
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <img onClick={()=>{handleNavi(product)}} src={product.thumbnail} alt={product.title} className="rounded-md" />

                  <div onClick={()=>{handleNavi(product)}}  className="flex justify-between items-end p-2">
                    <div>
                      <h2 className="text-sm md:text-base lg:text-lg text-gray-700 font-semibold mt-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-500 text-xs md:text-sm lg:text-base">{product.category}</p>
                      <p className="text-gray-700 text-xs md:text-sm lg:text-base">{product.brand}</p>
                      <div className="mt-1">
                        <p className="text-gray-400 line-through text-xs md:text-sm lg:text-base">${product.price}</p>
                        <p className="text-green-700 font-semibold text-sm md:text-base lg:text-lg">${discountedPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(Math.round(product.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xs md:text-sm lg:text-base">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      <button
        onClick={increaseLimit}
        className="bg-blue-600 text-white px-2 my-10 rounded mb-40 block mx-auto text-sm hover:bg-blue-700 transition"
      >
        Yana 10 ta qo‘shish
      </button>
    </div>
  );
}

export default Home;
