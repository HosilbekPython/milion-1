import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchProducts,
  filterByCategory,
} from "../redux/productSlice"; 
import { addViewedProduct } from '../redux/productSliceHistory';
import { toggleLike } from "../redux/likeSlice";
import { FaHeart } from "react-icons/fa";
import Mlogo from '../assets/mlogo.svg';

// 📌 Skeleton Loader (Yuklanayotgan mahsulotlar uchun)
const SkeletonLoader = () => (
  <div className="border rounded-lg shadow-sm overflow-hidden relative animate-pulse bg-gray-200">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-3">
      <div className="h-6 bg-gray-400 mb-2"></div>
      <div className="h-4 bg-gray-400 mb-2"></div>
      <div className="h-4 bg-gray-400 mb-2 w-1/2"></div>
    </div>
  </div>
);

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { products, loading, error } = useSelector((state) => state.products);
  const { likedProducts } = useSelector((state) => state.likes);

  const [categoryProducts, setCategoryProducts] = useState({});
  const [categories, setCategories] = useState([]);
  
  const category = location.state?.category; // 📌 Kategoriya ma'lumotini olish

  // 📌 Sahifaga kirganda mahsulotlarni yuklash
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 📌 Mahsulotlarni kategoriyalar bo‘yicha ajratish
  useEffect(() => {
    const groupedProducts = {};
    products.forEach(product => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });
    setCategoryProducts(groupedProducts);
    setCategories(Object.keys(groupedProducts));
  }, [products]);

  // 📌 Kategoriya bosilganda navigatsiya va scroll qilish
  useEffect(() => {
    if (category) {
      setTimeout(() => {
        const element = document.getElementById(category);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [category]);

  // 📌 "Ko‘proq ko‘rish" tugmasi bosilganda boshqa sahifaga o‘tish
  const handleMoreClick = (category) => {
    navigate("/browse", { state: { category } });
  };

  // 📌 Kategoriya bosilganda Home sahifasiga yo‘naltirish va scroll qilish
  const handleCategoryClick = (category) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { category } });
    } else {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // 📌 Mahsulot sahifasiga o'tish va Viewed Product ga qo‘shish
  const handleNavi = (product) => {
    dispatch(addViewedProduct(product));
    navigate("/full", { state: { product } });
  };

  return (
    <div className="container mx-auto text-gray-900 mb-13">
      <h1 className="text-3xl text-gray-950 py-5">Mahsulotlar</h1>

      {/* 📌 Agar yuklanayotgan bo‘lsa, Skeleton Loader ko‘rsatish */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Xatolik: {error}</p>
      ) : (
        // 📌 Kategoriyalarni chiqarish
        Object.keys(categoryProducts).map((category) => (
          <div key={category} className="mt-8" id={category}>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoryProducts[category].slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-sm overflow-hidden relative"
                >
                  {/* 📌 Yurak tugmasi - Like toggle */}
                  <button
                    onClick={() => dispatch(toggleLike(product.id))}
                    className="absolute top-2 right-2 text-xl text-red-500"
                  >
                    <FaHeart
                      className={
                        likedProducts.includes(product.id)
                          ? "text-red-600"
                          : "text-gray-400"
                      }
                    />
                  </button>

                  {/* 📌 Mahsulot rasmi */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleNavi(product)}
                  />

                  {/* 📌 Mahsulot ma'lumotlari */}
                  <div
                    onClick={() => handleNavi(product)}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex justify-between items-end">
                      <h3 className="text-lg text-gray-900 font-semibold">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 line-through text-sm">{product.price}$</p>
                    <p className="text-green-600 font-semibold">
                      $
                      {(
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>

                    {/* 📌 Logo va reyting */}
                    <div className="mt-3 flex justify-between items-center">
                      <div className='rounded-full bg-gray-900'>
                        <img src={Mlogo} className='w-5' alt="" />
                      </div>
                      <div className="flex mt-2">
                        {[...Array(Math.round(product.rating))].map((_, index) => (
                          <span key={index} className="text-yellow-500 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 📌 "Ko‘proq ko‘rish" tugmasi */}
            <div className="text-center mt-4">
              <button
                onClick={() => handleMoreClick(category)}
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Ko'proq ko‘rish
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
