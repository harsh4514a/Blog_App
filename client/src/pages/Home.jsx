// import { useSelector } from "react-redux";
// import heroImg from "../assests/homeImg.png";
// import { motion } from "framer-motion";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Spinner from "../assests/spinner/Spinner";
// import LeftSidebar from "../components/LeftSidebar";

// const BACKEND_URL = "http://localhost:8000";

// const Home = () => {
//   // const { blogs } = useSelector((state) => state.blogSliceApp.blogs);

//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const { theme } = useSelector((state) => state.themeSliceApp);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getAllBlogs = async () => {
//       setLoading(true);
//       try {
//         const query = selectedCategory
//           ? `${BACKEND_URL}/api/blog/get-all-blogs?limit=9&category=${encodeURIComponent(
//               selectedCategory
//             )}`
//           : `${BACKEND_URL}/api/blog/get-all-blogs?limit=9`;
//         const response = await axios.get(query);

//         if (response.status === 200) {
//           setRecentBlogs(response.data.blogs);
//         }
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.log(error.message);
//       }
//     };
//     getAllBlogs();
//   }, [selectedCategory]);

//   const handleCategorySelect = (category) => {
//     // If category is empty string or "All", reset filter
//     setSelectedCategory(category === "" || category === "All" ? "" : category);
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col lg:flex-row gap-4">
//         {/* Left Sidebar */}
//         <div className="my-5 ml-3 lg:w-64 lg:flex-shrink-0 hidden lg:block ">
//           <LeftSidebar
//             onCategorySelect={handleCategorySelect}
//             selectedCategory={selectedCategory}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           <h1 className="text-2xl text-center my-5">Recent Blogs</h1>

//           {loading ? (
//             <span className="flex justify-center w-full my-5">
//               <Spinner />
//             </span>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl px-5 my-1">
//               {recentBlogs &&
//                 recentBlogs.map((value, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className={`shadow-md duration-200 border hover:scale-[99%]  transition-all rounded-xl pb-5 cursor-pointer ${
//                         theme === "dark" ? "border-gray-700" : "border-gray-200"
//                       }`}
//                     >
//                       <Link to={`/blog/${value.slug}`}>
//                         <img
//                           src={`${BACKEND_URL}${value.blogImgFile}`}
//                           className="hover:scale-[99%] duration-200  transition-all w-full h-48 rounded-tl-xl rounded-br-xl object-cover"
//                         />

                        

//                         <div className="flex flex-col justify-between h-36 px-3 pb-3">
//                           {/* Blog Title */}
//                           <p className="text-lg md:text-xl mb-2">
//                             {value.blogTitle}
//                           </p>

//                           {/* ✅ Category moved to bottom */}
//                           <div className="mt-auto flex justify-center border-t pt-3">
//                             <span className="text-xs md:text-sm text-center border-2 border-purple-400 text-purple-600 px-4 py-1 rounded-full">
//                               {value.blogCategory}
//                             </span>
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   );
//                 })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;


// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Spinner from "../assests/spinner/Spinner";
// import LeftSidebar from "../components/LeftSidebar";
// import { motion } from "framer-motion";

// const BACKEND_URL = "http://localhost:8000";

// const Home = () => {
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { theme } = useSelector((state) => state.themeSliceApp);

//   useEffect(() => {
//     const getAllBlogs = async () => {
//       setLoading(true);
//       try {
//         const query = selectedCategory
//           ? `${BACKEND_URL}/api/blog/get-all-blogs?limit=9&category=${encodeURIComponent(
//               selectedCategory
//             )}`
//           : `${BACKEND_URL}/api/blog/get-all-blogs?limit=9`;
//         const response = await axios.get(query);
//         if (response.status === 200) {
//           setRecentBlogs(response.data.blogs);
//         }
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getAllBlogs();
//   }, [selectedCategory]);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category === "" || category === "All" ? "" : category);
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col lg:flex-row gap-4">
//         {/* Sidebar */}
//         <div className="my-5 ml-3 lg:w-64 lg:flex-shrink-0 hidden lg:block">
//           <LeftSidebar
//             onCategorySelect={handleCategorySelect}
//             selectedCategory={selectedCategory}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-center my-6">
//             Recent Blogs
//           </h1>

//           {loading ? (
//             <div className="flex justify-center my-10">
//               <Spinner />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-5 pb-10">
//               {recentBlogs.length > 0 ? (
//                 recentBlogs.map((value, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     className={`flex flex-col justify-between bg-white ${
//                       theme === "dark"
//                         ? "bg-gray-900 border-gray-700"
//                         : "border-gray-200"
//                     } border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
//                   >
//                     <Link to={`/blog/${value.slug}`}>
//                       {/* Blog Image */}
//                       <div className="overflow-hidden rounded-t-xl">
//                         <img
//                           src={`${BACKEND_URL}${value.blogImgFile}`}
//                           alt={value.blogTitle}
//                           className="rounded-t-xl object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>

//                       {/* Blog Content */}
//                       <div className="flex flex-col justify-between p-4 h-36">
//                         <p
//                           className={`text-lg md:text-xl font-semibold mb-3 ${
//                             theme === "dark"
//                               ? "text-gray-100 hover:text-purple-400"
//                               : "text-gray-800 hover:text-purple-600"
//                           } transition-colors line-clamp-2`}
//                         >
//                           {value.blogTitle}
//                         </p>

//                         {/* Category at Bottom */}
//                         <div className="mt-auto flex justify-center border-t pt-3">
//                           <span className="text-xs md:text-sm font-medium text-purple-700 bg-purple-100 px-4 py-1 rounded-full shadow-sm">
//                             {value.blogCategory}
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 col-span-3">
//                   No blogs found in this category.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Spinner from "../assests/spinner/Spinner";
// import LeftSidebar from "../components/LeftSidebar";
// import { motion } from "framer-motion";

// const BACKEND_URL = "http://localhost:8000";

// const Home = () => {
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { theme } = useSelector((state) => state.themeSliceApp);

//   // Fetch blogs
//   useEffect(() => {
//     const getAllBlogs = async () => {
//       setLoading(true);
//       try {
//         const query = selectedCategory
//           ? `${BACKEND_URL}/api/blog/get-all-blogs?limit=9&category=${encodeURIComponent(
//               selectedCategory
//             )}`
//           : `${BACKEND_URL}/api/blog/get-all-blogs?limit=9`;
//         const response = await axios.get(query);
//         if (response.status === 200) {
//           setRecentBlogs(response.data.blogs);
//         }
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getAllBlogs();
//   }, [selectedCategory]);

//   // Handle category filter
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category === "" || category === "All" ? "" : category);
//   };

//   // Function for dynamic category colors
//   const getCategoryColor = (category) => {
//     switch (category) {
//       case "Cybersecurity & Privacy":
//         return "bg-blue-100 text-blue-700";
//       case "Web Design & UI/UX":
//         return "bg-pink-100 text-pink-700";
//       case "Data Science & Analytics":
//         return "bg-green-100 text-green-700";
//       case "Startups & Entrepreneurship":
//         return "bg-yellow-100 text-yellow-700";
//       case "Education & Learning Resources":
//         return "bg-indigo-100 text-indigo-700";
//       case "Tech Reviews & Product Insights":
//         return "bg-purple-100 text-purple-700";
//       case "Artificial Intelligence & Machine Learning":
//         return "bg-rose-100 text-rose-700";
//       case "Career & Personal Growth":
//         return "bg-teal-100 text-teal-700";
//       case "Programming & Development":
//         return "bg-orange-100 text-orange-700";
//       case "Technology & Innovation":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col lg:flex-row gap-4">
//         {/* Sidebar */}
//         <div className="my-5 ml-3 lg:w-64 lg:flex-shrink-0 hidden lg:block">
//           <LeftSidebar
//             onCategorySelect={handleCategorySelect}
//             selectedCategory={selectedCategory}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-center my-6">
//             Recent Blogs
//           </h1>

//           {loading ? (
//             <div className="flex justify-center my-10">
//               <Spinner />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-5 pb-10">
//               {recentBlogs.length > 0 ? (
//                 recentBlogs.map((value, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     className={`flex flex-col justify-between bg-white ${
//                       theme === "dark"
//                         ? "bg-gray-900 border-gray-700"
//                         : "border-gray-200"
//                     } border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:brightness-105 transition-all duration-300 cursor-pointer min-h-[380px]`}
//                   >
//                     <Link to={`/blog/${value.slug}`}>
//                       {/* Blog Image */}
//                       <div className="overflow-hidden rounded-t-xl">
//                         <img
//                           src={`${BACKEND_URL}${value.blogImgFile}`}
//                           alt={value.blogTitle}
//                           className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>

//                       {/* Blog Content */}
//                       <div className="flex flex-col justify-between p-4 flex-grow">
//                         {/* Title */}
//                         <p
//                           className={`text-lg md:text-xl font-semibold mb-3 ${
//                             theme === "dark"
//                               ? "text-gray-100 hover:text-purple-400"
//                               : "text-gray-800 hover:text-purple-600"
//                           } transition-colors line-clamp-2`}
//                         >
//                           {value.blogTitle}
//                         </p>

//                         {/* Small Info (optional) */}
//                         <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
//                           <span>
//                             {new Date(value.createdAt).toLocaleDateString()}
//                           </span>
//                           <span>
//                             {Math.ceil(value.blogBody.length / 1000)} min read
//                           </span>
//                         </div>

//                         {/* Category at Bottom */}
//                         <div className="mt-auto flex justify-center border-t pt-3">
//                           <span
//                             className={`text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow-sm ${getCategoryColor(
//                               value.blogCategory
//                             )}`}
//                           >
//                             {value.blogCategory}
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 col-span-3">
//                   No blogs found in this category.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;



// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Spinner from "../assests/spinner/Spinner";
// import LeftSidebar from "../components/LeftSidebar";
// import { motion } from "framer-motion";

// const BACKEND_URL = "http://localhost:8000";

// const Home = () => {
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { theme } = useSelector((state) => state.themeSliceApp);

//   // Fetch blogs
//   useEffect(() => {
//     const getAllBlogs = async () => {
//       setLoading(true);
//       try {
//         const query = selectedCategory
//           ? `${BACKEND_URL}/api/blog/get-all-blogs?limit=9&category=${encodeURIComponent(
//               selectedCategory
//             )}`
//           : `${BACKEND_URL}/api/blog/get-all-blogs?limit=9`;
//         const response = await axios.get(query);
//         if (response.status === 200) {
//           setRecentBlogs(response.data.blogs);
//         }
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getAllBlogs();
//   }, [selectedCategory]);

//   // Handle category filter
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category === "" || category === "All" ? "" : category);
//   };

//   // Dynamic category color badges
//   const getCategoryColor = (category) => {
//     const colors = {
//       "Cybersecurity & Privacy": "bg-blue-100 text-blue-700",
//       "Web Design & UI/UX": "bg-pink-100 text-pink-700",
//       "Data Science & Analytics": "bg-green-100 text-green-700",
//       "Startups & Entrepreneurship": "bg-yellow-100 text-yellow-700",
//       "Education & Learning Resources": "bg-indigo-100 text-indigo-700",
//       "Tech Reviews & Product Insights": "bg-purple-100 text-purple-700",
//       "Artificial Intelligence & Machine Learning": "bg-rose-100 text-rose-700",
//       "Career & Personal Growth": "bg-teal-100 text-teal-700",
//       "Programming & Development": "bg-orange-100 text-orange-700",
//       "Technology & Innovation": "bg-gray-100 text-gray-700",
//     };
//     return colors[category] || "bg-gray-100 text-gray-700";
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col lg:flex-row gap-6 transition-all duration-300 ${
//         theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       {/* Sidebar */}
//       <div className="my-6 ml-4 lg:w-64 lg:flex-shrink-0 hidden lg:block">
//         <LeftSidebar
//           onCategorySelect={handleCategorySelect}
//           selectedCategory={selectedCategory}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 px-5">
//         <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
//           Recent Blogs
//         </h1>

//         {loading ? (
//           <div className="flex justify-center my-10">
//             <Spinner />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-10">
//             {recentBlogs.length > 0 ? (
//               recentBlogs.map((value, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: index * 0.05 }}
//                   className={`flex flex-col justify-between bg-white ${
//                     theme === "dark"
//                       ? "bg-gray-900 border-gray-700"
//                       : "border-gray-200"
//                   } border rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-purple-400 transition-all duration-300 cursor-pointer min-h-[400px]`}
//                 >
//                   <Link to={`/blog/${value.slug}`}>
//                     {/* Blog Image */}
//                     <div className="overflow-hidden rounded-t-xl">
//                       <img
//                         src={`${BACKEND_URL}${value.blogImgFile}`}
//                         alt={value.blogTitle}
//                         className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* Blog Content */}
//                     <div className="flex flex-col justify-between p-4 flex-grow">
//                       {/* Blog Title */}
//                       <p
//                         className={`text-lg md:text-xl font-semibold mb-3 leading-snug ${
//                           theme === "dark"
//                             ? "text-gray-100 hover:text-purple-400"
//                             : "text-gray-800 hover:text-purple-600"
//                         } transition-colors line-clamp-2`}
//                       >
//                         {value.blogTitle}
//                       </p>

//                       {/* Meta Info */}
//                       <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
//                         <span>{new Date(value.createdAt).toLocaleDateString()}</span>
//                         <span>{Math.ceil(value.blogBody.length / 1000)} min read</span>
//                       </div>

//                       {/* Category Badge */}
//                       <div className="mt-auto flex justify-center border-t pt-3">
//                         <span
//                           className={`text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow-sm ${getCategoryColor(
//                             value.blogCategory
//                           )}`}
//                         >
//                           {value.blogCategory}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 col-span-3 mt-5">
//                 No blogs found in this category.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Optional: View All Button */}
//         {recentBlogs.length > 0 && (
//           <div className="flex justify-center mt-6">
//             <Link
//               to="/all-blogs"
//               className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-all"
//             >
//               View All Blogs →
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../assests/spinner/Spinner";
import LeftSidebar from "../components/LeftSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import BACKEND_URL from "../config/apiConfig";
// const BACKEND_URL = "http://localhost:8000";

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.themeSliceApp);

  // Fetch limited recent blogs
  useEffect(() => {
    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const query = selectedCategory
          ? `${BACKEND_URL}/api/blog/get-all-blogs?limit=9&category=${encodeURIComponent(
              selectedCategory
            )}`
          : `${BACKEND_URL}/api/blog/get-all-blogs?limit=9`;

        const response = await axios.get(query);
        if (response.status === 200) {
          setRecentBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, [selectedCategory]);

  // Handle category filter
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "" || category === "All" ? "" : category);
    setSidebarOpen(false); // Close mobile drawer when selecting a category
  };

  // Dynamic category badge color
  const getCategoryColor = (category) => {
    const colors = {
      "Cybersecurity & Privacy": "bg-blue-100 text-blue-700",
      "Web Design & UI/UX": "bg-pink-100 text-pink-700",
      "Data Science & Analytics": "bg-green-100 text-green-700",
      "Startups & Entrepreneurship": "bg-yellow-100 text-yellow-700",
      "Education & Learning Resources": "bg-indigo-100 text-indigo-700",
      "Tech Reviews & Product Insights": "bg-purple-100 text-purple-700",
      "Artificial Intelligence & Machine Learning": "bg-rose-100 text-rose-700",
      "Career & Personal Growth": "bg-teal-100 text-teal-700",
      "Programming & Development": "bg-orange-100 text-orange-700",
      "Technology & Innovation": "bg-gray-100 text-gray-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row gap-6 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* 🟣 Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Categories</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md border border-gray-300 hover:bg-purple-100 dark:hover:bg-gray-800 transition-all"
        >
          {sidebarOpen ? (
            <IoClose size={22} className="text-purple-600" />
          ) : (
            <FiMenu size={22} className="text-purple-600" />
          )}
        </button>
      </div>

      {/* Sidebar Drawer for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 left-0 h-full z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h2 className="text-lg font-semibold">Filter by Category</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-purple-100 dark:hover:bg-gray-800 rounded-md transition"
                >
                  <IoClose size={22} className="text-purple-600" />
                </button>
              </div>
              <div className="flex-1 p-4">
                <LeftSidebar
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </div>
            </motion.aside>

            {/* Overlay (Mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
          </>
        )}
      </AnimatePresence>

      {/* Static Sidebar (Desktop) */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 my-6 ml-4">
        <LeftSidebar
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* 📰 Main Content */}
      <main className="flex-1 px-4 md:px-6 mt-6">
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          Recent Blogs
        </h1>

        {loading ? (
          <div className="flex justify-center my-10">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-10">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex flex-col justify-between bg-white ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700"
                      : "border-gray-200"
                  } border rounded-xl shadow-md hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:-translate-y-1 hover:border-purple-400 transition-all duration-300 cursor-pointer min-h-[400px]`}
                >
                  <Link to={`/blog/${value.slug}`}>
                    <div className="overflow-hidden rounded-t-xl">
                      <img
                        src={`${BACKEND_URL}${value.blogImgFile}`}
                        alt={value.blogTitle}
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-4 flex-grow">
                      <p
                        className={`text-lg md:text-xl font-semibold mb-3 leading-snug ${
                          theme === "dark"
                            ? "text-gray-100 hover:text-purple-400"
                            : "text-gray-800 hover:text-purple-600"
                        } transition-colors line-clamp-2`}
                      >
                        {value.blogTitle}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>
                          {new Date(value.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          {Math.ceil(value.blogBody.length / 1000)} min read
                        </span>
                      </div>

                      <div className="mt-auto flex justify-center border-t pt-3">
                        <span
                          className={`text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow-sm ${getCategoryColor(
                            value.blogCategory
                          )}`}
                        >
                          {value.blogCategory}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3 mt-5">
                No blogs found in this category.
              </p>
            )}
          </div>
        )}

        {/* View All Blogs Button */}
        {recentBlogs.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/all-blog")}
              className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-all"
            >
              View All Blogs →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

