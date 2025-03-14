import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-r ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-gray-900">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Profil</h2>

        {user ? (
          <div className="">
            <div className="relative inline-block mb-4">
              <img
                src={user.profileImage}
                alt="Profil rasmi"
                className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{user.fullName}</h3>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <p className="text-lg">
                📞 <span className="font-semibold">{user.phone}</span>
              </p>
              <p className="text-lg">
                📍 <span className="font-semibold">{user.address}</span>
              </p>
              <p className="text-lg">
                🎂 <span className="font-semibold">{user.birthDate}</span>
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/register");
              }}
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
            >
              Chiqish
            </button>
          </div>
        ) : (
          <p className="text-center text-white text-lg">Ma’lumot yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
