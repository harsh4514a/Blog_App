import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import BlogLoader from "../assests/blogSpinner/BlogLoader";
import BACKEND_URL from "../config/apiConfig";
// const BACKEND_URL = "http://localhost:8000";

const AllBlogs = ({ isAdmin = true }) => {
  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);

  const [userBlogs, setUserBlogs] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(2);

  // ✅ Fetch Blogs
  useEffect(() => {
    const getBlogs = async () => {
      setLoader(true);
      try {
        const query = isAdmin
          ? `${BACKEND_URL}/api/blog/get-all-blogs?page=1`
          : `${BACKEND_URL}/api/blog/get-all-blogs?userId=${user?._id}&page=1`;

        const fetchBlogs = await axios.get(query);

        if (fetchBlogs.status === 200) {
          setUserBlogs(fetchBlogs.data.blogs);
          setShowMoreButton(fetchBlogs.data.blogs.length > 5);
        }
      } catch (error) {
        toast.error("An unexpected error occurred!");
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    getBlogs();
  }, [user?._id, isAdmin]);

  // ✅ Show More button
  const fetchMoreBlogs = async (page = 2) => {
    try {
      const query = isAdmin
        ? `${BACKEND_URL}/api/blog/get-all-blogs?page=${page}`
        : `${BACKEND_URL}/api/blog/get-all-blogs?userId=${user?._id}&page=${page}`;
      const response = await axios.get(query);
      if (response.status === 200) {
        setUserBlogs((prev) => [...prev, ...response.data.blogs]);
        setPage(page + 1);
        if (response.data.blogs.length === 0) {
          setShowMoreButton(false);
          toast.success("All blogs have been loaded!");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleShowMore = () => fetchMoreBlogs(page);

  // ✅ Category Color Helper
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
    <>
      <div
        className={`min-h-screen transition-all duration-300 px-4 py-6 ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-gradient-to-br from-gray-50 to-purple-50 text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          All Blogs
        </h1>

        {loader ? (
          <div className="flex justify-center items-center h-64">
            <BlogLoader />
          </div>
        ) : userBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No blogs found <span className="inline-block">😔</span>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-10">
            {userBlogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex flex-col justify-between bg-white ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700"
                    : "border-gray-200"
                } border rounded-xl shadow-md hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:-translate-y-1 hover:border-purple-400 transition-all duration-300 cursor-pointer min-h-[400px]`}
              >
                <Link to={`/blog/${blog.slug}`}>
                  {/* Blog Image */}
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={`${BACKEND_URL}${blog.blogImgFile}`}
                      alt={blog.blogTitle}
                      className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="flex flex-col justify-between p-4 flex-grow">
                    <p
                      className={`text-lg md:text-xl font-semibold mb-3 leading-snug ${
                        theme === "dark"
                          ? "text-gray-100 hover:text-purple-400"
                          : "text-gray-800 hover:text-purple-600"
                      } transition-colors line-clamp-2`}
                    >
                      {blog.blogTitle}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                      <span>
                        {Math.ceil(blog.blogBody.length / 1000)} min read
                      </span>
                    </div>

                    {/* Category */}
                    <div className="mt-auto flex justify-center border-t pt-3">
                      <span
                        className={`text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow-sm ${getCategoryColor(
                          blog.blogCategory
                        )}`}
                      >
                        {blog.blogCategory}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {showMoreButton && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-all"
            >
              Show More →
            </button>
          </div>
        )}
      </div>

      <Toaster />
    </>
  );
};

export default AllBlogs;
