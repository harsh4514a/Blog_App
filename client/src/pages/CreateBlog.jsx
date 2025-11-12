import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addBlogStart, addBlogFailure, addBlogSuccess } from '../features/blogSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CreateBlog = () => {

    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [blogImage, setBlogImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        user: user
    });





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


    const publishBlogBtn = (e) => {
        e.preventDefault();
        validateForm(formData)
    }



    const validateForm = async (formInfo) => {

        // Blog Title Validation:
        if (!formInfo.blogTitle) {
            toast.error('Blog title is required!');
            return false
        }

        // Category validation:
        if (!formData.blogCategory || formData.blogCategory === 'Select Category') {
            toast.error('Please select a valid category!');
            return false;
        }

        // Image validation:
        if (!blogImage) {
            toast.error('Please select an image!');
            return false;
        }

        // Post body validation :
        if (!formData.blogBody) {
            toast.error('Post body can not be empty!')
            return false;
        } else if (formData.blogBody.length < 20) {
            toast.error('Post body can be less than 20 char!');
            return false;
        } else {

            try {

                dispatch(addBlogStart());
                const formDataToSend = new FormData();
                formDataToSend.append('blogTitle', formData.blogTitle);
                formDataToSend.append('blogCategory', formData.blogCategory);
                formDataToSend.append('blogBody', formData.blogBody);
                formDataToSend.append('user', JSON.stringify(user));
                formDataToSend.append('blogImgFile', blogImage);

                const addBlog = await axios.post(`/api/blog/post-blog`, formDataToSend, {
                    headers: {
                        Authorization: user.token,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (addBlog.status === 200) {

                    const response = addBlog.data.blog;
                    dispatch(addBlogSuccess(response));
                    toast.success('Blog created successfully!');
                    // Reset form
                    setFormData({ user: user });
                    setBlogImage(null);
                    setPreviewUrl(null);
                    navigate(`/blog/${response.slug}`);
                }
            } catch (error) {
                dispatch(addBlogFailure(error));
                // Improved error logging for debugging
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(`Failed to create blog: ${error.response.data.message}`);
                } else {
                    toast.error('Failed to create blog');
                }
                console.log('Error details:', error);
            }
        }
    }



    return (
        <>
            <div className="min-h-screen flex w-full  items-center flex-col">

                <h1 className="text-3xl py-5 text-violet-500 font-semibold">Create Blog</h1>

                <form action="" className="flex flex-col w-10/12 gap-5">

                    <div className="flex gap-5">

                        <input type="text" placeholder="Blog Title" className={`py-2 rounded-md px-3 border outline-none w-full ${theme === 'dark' && 'bg-gray-700 border-gray-500'}`} required name='blogTitle' onChange={inputChangeHandle} />

                        <select defaultValue={'Select category'} className={` outline-none py-2 rounded-md px-5 border ${theme === 'dark' && 'bg-gray-700 border border-gray-500'}`} required name='blogCategory' onChange={inputChangeHandle}>
                            <option >Select Category</option>
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
                            previewUrl ? <img src={previewUrl} className=' rounded-md w-full bg-cover h-96 bg-center' /> : ''
                        }
                    </div>

                    <div className="my-5">
                        <ReactQuill className='h-72 ' onChange={reactQuillChange} />
                    </div>

                    <button type='submit' className='bg-gray-700 text-white font-semibold active:bg-gray-800 py-2 rounded-md my-5' onClick={publishBlogBtn}>Publish Blog</button>

                </form >
            </div >
            <Toaster />
        </>
    )
}
export default CreateBlog;