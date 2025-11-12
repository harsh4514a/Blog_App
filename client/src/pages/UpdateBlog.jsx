import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBlogStart, updateBlogFailure, updateBlogSuccess } from '../features/blogSlice';
import BACKEND_URL from "../config/apiConfig";
// const BACKEND_URL = 'http://localhost:8000';








const UpdateBlog = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogId } = useParams();

    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);

    const [blogImage, setBlogImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({});








    const blogImgChangeHandle = (e) => {
        const file = e.target.files[0];
        setBlogImage(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };


    const inputChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }


    const reactQuillChange = (e) => {
        const blogBody = e;
        setFormData({
            ...formData, blogBody
        })
    }


    const updateBlogPost = (e) => {
        e.preventDefault();
        validateForm(formData)
    }



    // Get Api for fetching the blogs :

    const fetchBlog = async () => {
        try {
            const getBlog = await axios.get(`/api/blog/get-all-blogs?blogId=${blogId}`);

            if (getBlog.status === 200) {
                const response = getBlog.data.blogs[0];

                if (response) {
                    setFormData(response);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchBlog();
    }, [blogId]);



    // Form Validation :
    const validateForm = async (formInfo) => {

        if (!formInfo.blogTitle) {
            toast.error('Blog title is required!');
            return false
        }
        if (!formData.blogBody) {
            toast.error('Post body can not be empty!')
            return false;
        } else if (formData.blogBody.length < 20) {
            toast.error('Post body can be less than 20 char!');
            return false;
        } else {
            // PUT req for updating the blog :
            try {
                dispatch(updateBlogStart());
                const formDataToSend = new FormData();
                formDataToSend.append('blogTitle', formData.blogTitle);
                formDataToSend.append('blogCategory', formData.blogCategory);
                formDataToSend.append('blogBody', formData.blogBody);
                formDataToSend.append('user', JSON.stringify(user));
                if (blogImage) {
                    formDataToSend.append('blogImgFile', blogImage);
                } else {
                    formDataToSend.append('blogImgFile', formData.blogImgFile);
                }

                const updateBlog = await axios.put(`/api/blog/update-blog/${blogId}/${user._id}`, formDataToSend, {
                    headers: {
                        Authorization: user.token,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (updateBlog.status === 200) {

                    const response = updateBlog.data.blog
                    dispatch(updateBlogSuccess(response));
                    toast.success('Blog updated successfully!');
                    navigate(`/blog/${response.slug}`);

                }
            } catch (error) {
                dispatch(updateBlogFailure(error.message));
                console.error(error.message);
                toast.error('Failed to update blog');
            }
        }
    }

    return (
        <>
            <div className="min-h-screen flex w-full  items-center flex-col">

                <h1 className="text-3xl py-5 text-violet-500 font-semibold">Update Blog</h1>

                <form action="" className="flex flex-col w-10/12 gap-5">

                    <div className="flex gap-5">

                        <input type="text" placeholder="Blog Title" className={`py-2 rounded-md px-3 border outline-none w-full ${theme === 'dark' && 'bg-gray-700 border-gray-500'}`} required name='blogTitle' onChange={inputChangeHandle} value={formData && formData.blogTitle} />

                        <select defaultValue={'Select category'} className={` outline-none py-2 rounded-md px-5 border ${theme === 'dark' && 'bg-gray-700 border border-gray-500'}`} required name='blogCategory' onChange={inputChangeHandle} value={formData && formData.blogCategory}>
                            <option disabled >Select Category</option>
                            <option>Technology & Innovation</option>
                            <option>Programming & Development</option>
                            <option>Artificial Intelligence & Machine Learning</option>
                            <option>Career & Personal Growth</option>
                            <option>Education & Learning Resources</option>
                            <option>Data Science & Analytics</option>
                            <option>Cybersecurity & Privacy</option>
                            <option>Web Design & UI/UX</option>
                            <option>Startups & Entrepreneurship</option>
                            <option>Tech Reviews & Product Insights</option>
                        </select>

                    </div>
                    <div className="flex items-center border-2 border-dotted py-2 px-3 border-violet-500 ">
                        <input type="file" accept='image/*' onChange={blogImgChangeHandle} />
                    </div>

                    <div className="w-full flex justify-center">
                        {
                            formData && <img src={previewUrl || `${BACKEND_URL}${formData.blogImgFile}`} className='h-96 object-cover rounded-md w-full' />
                        }
                    </div>

                    <div className="my-5">
                        <ReactQuill className='h-72 ' onChange={reactQuillChange} value={formData.blogBody} />
                    </div>

                    <button type='submit' className='bg-gray-700 text-white font-semibold active:bg-gray-800 py-2 rounded-md my-5' onClick={updateBlogPost}>Update changes</button>

                </form >
            </div >
            <Toaster />
        </>
    )
}
export default UpdateBlog;