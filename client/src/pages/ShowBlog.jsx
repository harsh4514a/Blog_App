// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom';
// import BlogLoader from '../assests/blogSpinner/BlogLoader';
// import { MdUpdate } from "react-icons/md";
// import { MdDateRange } from "react-icons/md";
// import { BiCategoryAlt } from "react-icons/bi";

// import CommentCard from '../components/CommentCard';
// import RecentBlog from '../components/RecentBlog';
// import LeftSidebar from '../components/LeftSidebar';

// const BACKEND_URL = 'http://localhost:8000';

// const ShowBlog = () => {

//     const { theme } = useSelector((state) => state.themeSliceApp);

//     const [slug, setSlug] = useState();
//     const { blogSlug } = useParams();
//     const [loader, setLoader] = useState(false);
//     const [limitBlogs, setLimitBlogs] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');




//     useEffect(() => {

//         const fetchBlogSlug = async () => {
//             try {
//                 setLoader(true);
//                 const fetchSlug = await axios.get(`/api/blog/get-all-blogs?slug=${blogSlug}`);
//                 const response = fetchSlug;
//                 setLoader(false)

//                 if (response.status === 200) {
//                     const getSlug = response.data.blogs[0];
//                     setSlug(getSlug);
//                 }
//             } catch (error) {
//                 setLoader(false);
//                 console.log(error.message);
//             }
//         }
//         fetchBlogSlug();
//     }, [blogSlug]);






//     useEffect(() => {

//         const getLimitBlogs = async () => {

//             try {
//                 const query = selectedCategory ? `/api/blog/get-all-blogs?limit=3&category=${selectedCategory}` : `/api/blog/get-all-blogs?limit=3`;
//                 const getBlogs = await axios.get(query);

//                 if (getBlogs.status === 200) {
//                     setLimitBlogs(getBlogs.data.blogs)
//                 }

//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         getLimitBlogs();
//     }, [selectedCategory]);


//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//     };

//     return (
//         <>
//             <div className="min-h-screen flex flex-col lg:flex-row gap-4">
                

//                 {/* Main Content */}
//                 <div className="flex-1 lg:w-[60%]">
//                     {loader
//                         ?
//                         <BlogLoader />
//                         :
//                         <>
//                             {
//                                 slug &&

//                                 <div className="pt-10 sm:w-[80%] w-[85%] md:w-[50%] m-auto">

//                                     <h1 className='text-2xl md:text-4xl font-semibold text-center hover:-translate-y-1 hover:cursor-not-allowed transition-all peer-hover:'>{slug && slug.slug}</h1>

//                                     <div className='flex justify-center w-full my-10'>

//                                         <p className={`${theme === 'dark' ? 'border-gray-600' : 'border-red-600'} cursor-not-allowed hover:scale-95 transition-all rounded-full py-1 flex text-orange-400 px-5 font-semibold text-sm md:text-xl items-center justify-center gap-3`}> <span><BiCategoryAlt size={20} /></span>{slug && slug.blogCategory}</p>
//                                     </div>

//                                     <div className=" flex  justify-center text-center my-10">
//                                         <img src={slug && `${BACKEND_URL}${slug.blogImgFile}`} className='rounded-sm object-cover' alt="blog image" />
//                                     </div>

//                                     <div className="flex justify-center">
//                                         <div className="w-full">
//                                             <div className="border-b w-full flex justify-between">

//                                                 <div className='font-semibold flex items-center gap-1 md:gap-2'>
//                                                     <span><MdDateRange size={20} color='orange' /></span>
//                                                     <span className='text-xs md:text-lg'>{slug && new Date(slug.createdAt).toLocaleDateString()}</span>
//                                                 </div>
//                                                 <div className=" font-semibold flex items-center gap-1 md:gap-2">
//                                                     <span><MdUpdate size={20} color='orange' /></span>
//                                                     <span className='font-semibold text-xs md:text-lg'>{slug && (slug.blogBody.length / 1000).toFixed(0)}min read</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex w-full justify-center items-center flex-col my-10">
//                                         <div
//                                             dangerouslySetInnerHTML={{ __html: slug && slug.blogBody }}
//                                             className={`blog-content py-10  w-full max-w-[370px] text-justify md:max-w-3xl overflow-x-auto px-3 rounded-md `}>
//                                         </div>


                                        
//                                         {/* Comment Card  */}

//                                         <div className="">
//                                             <CommentCard blogId={slug && slug._id} />
//                                         </div>

//                                     </div>
//                                 </div>
//                             }
//                         </>
//                     }
//                 </div>

//                 {/* Right Sidebar - Recent Blogs */}
//                 <div className="lg:w-80 lg:flex-shrink-1">
//                     <div className="sticky top-4">
//                         <h1 className='text-2xl text-center mb-4'>Recent blogs</h1>
//                         <div className="space-y-4">
//                             {
//                                 limitBlogs && limitBlogs.map((value, index) => (
//                                     <RecentBlog key={index} blogs={value} />
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ShowBlog




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogLoader from '../assests/blogSpinner/BlogLoader';
import { MdUpdate, MdDateRange } from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';
import CommentCard from '../components/CommentCard';
import RecentBlog from '../components/RecentBlog';

import BACKEND_URL from "../config/apiConfig";
// const BACKEND_URL = 'http://localhost:8000';

const ShowBlog = () => {
  const { theme } = useSelector((state) => state.themeSliceApp);

  const [blog, setBlog] = useState(null);
  const { blogSlug } = useParams();
  const [loader, setLoader] = useState(false);
  const [limitBlogs, setLimitBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchBlogSlug = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`/api/blog/get-all-blogs?slug=${blogSlug}`);
        setLoader(false);

        if (response.status === 200 && response.data.blogs.length > 0) {
          setBlog(response.data.blogs[0]);
        }
      } catch (error) {
        setLoader(false);
        console.log('Error fetching blog:', error.message);
      }
    };
    fetchBlogSlug();
  }, [blogSlug]);

  useEffect(() => {
    const getLimitBlogs = async () => {
      try {
        const query = selectedCategory
          ? `/api/blog/get-all-blogs?limit=3&category=${selectedCategory}`
          : `/api/blog/get-all-blogs?limit=3`;

        const getBlogs = await axios.get(query);

        if (getBlogs.status === 200) {
          setLimitBlogs(getBlogs.data.blogs);
        }
      } catch (error) {
        console.log('Error fetching limited blogs:', error.message);
      }
    };
    getLimitBlogs();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row gap-4">
        {/* Main Content */}
        <div className="flex-1 lg:w-[60%]">
          {loader ? (
            <BlogLoader />
          ) : (
            <>
              {blog && (
                <div className="pt-10 sm:w-[80%] w-[85%] md:w-[50%] m-auto">
                  {/* ✅ FIXED: Use blog title instead of slug */}
                  <h1 className="text-2xl md:text-4xl font-semibold text-center normal-case hover:-translate-y-1 hover:cursor-not-allowed transition-all">
                    {blog.blogTitle}
                  </h1>

                  <div className="flex justify-center w-full my-10">
                    <p
                      className={`${
                        theme === 'dark' ? 'border-gray-600' : 'border-red-600'
                      } cursor-not-allowed hover:scale-95 transition-all rounded-full py-1 flex text-orange-400 px-5 font-semibold text-sm md:text-xl items-center justify-center gap-3`}
                    >
                      <span>
                        <BiCategoryAlt size={20} />
                      </span>
                      {blog.blogCategory}
                    </p>
                  </div>

                  <div className="flex justify-center text-center my-10 ">
                    <img
                      src={`${BACKEND_URL}${blog.blogImgFile}`}
                      className="rounded-sm  min-h-80 min-w-80"
                      alt="blog"
                    />
                  </div>

                  <div className="flex justify-center">
                    <div className="w-full">
                      <div className="border-b w-full flex justify-between">
                        <div className="font-semibold flex items-center gap-1 md:gap-2">
                          <MdDateRange size={20} color="orange" />
                          <span className="text-xs md:text-lg">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="font-semibold flex items-center gap-1 md:gap-2">
                          <MdUpdate size={20} color="orange" />
                          <span className="font-semibold text-xs md:text-lg">
                            {(blog.blogBody.length / 1000).toFixed(0)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full justify-center items-center flex-col my-10">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.blogBody }}
                      className="blog-content py-10 w-full max-w-[370px] text-justify md:max-w-3xl overflow-x-auto px-3 rounded-md"
                    ></div>

                    {/* Comment Card */}
                    <div>
                      <CommentCard blogId={blog._id} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Sidebar - Recent Blogs */}
        <div className="lg:w-80 lg:flex-shrink-1">
          <div className="sticky top-4">
            <h1 className="text-2xl text-center mb-4">Recent blogs</h1>
            <div className="space-y-4">
              {limitBlogs &&
                limitBlogs.map((value, index) => (
                  <RecentBlog key={index} blogs={value} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBlog;
