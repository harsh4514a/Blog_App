import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import blogModel from "../model/blogModel.js";
import userModel from '../model/userModel.js';





// Get all blogs : 

export const getAllBlogs = asyncHandler(async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limitBlogs = parseInt(req.query.limit) || 8;
    const sortBlog = req.query.sort === 'asc' ? 1 : -1;
    const skipBlogs = (page - 1) * limitBlogs

    const filterBlogs = {
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { blogCategory: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.blogId && { _id: req.query.blogId }),
        ...(req.query.searchBlog && {

            $or: [
                { blogTitle: { $regex: req.query.searchBlog, $options: 'i' } },
                { blogBody: { $regex: req.query.searchBlog, $options: 'i' } }
            ]
        })
    }


    try {
        const blogs = await blogModel.find(filterBlogs).skip(skipBlogs).sort({ updatedAt: sortBlog }).limit(limitBlogs)


        const countBlogs = await blogModel.countDocuments(filterBlogs);

        const currentDate = new Date();

        const oneMonthAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
        );

        const lastMonthBlogs = await userModel.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });


        return res.status(200).json({
            success: true,
            message: 'Blogs have been fetched',
            lastMonthBlogs,
            countBlogs,
            blogs
        })
    } catch (error) {
        return next(errorHandler(error.message, 500));
    }
});




// Post Blog : POST API -

export const postBlog = asyncHandler(async (req, res, next) => {

    let { blogTitle, blogCategory, blogBody, user } = req.body;

    // Parse user if it's a string (from multipart/form-data)
    if (typeof user === 'string') {
        try {
            user = JSON.parse(user);
        } catch (err) {
            return next(errorHandler('Invalid user data!', 400));
        }
    }

    if (!user) {
        return next(errorHandler('You are not authorized to create blog!', 401));
    }

    if (!req.file) {
        return next(errorHandler('Image file is required!', 400));
    }

    const blogImgFile = `/uploads/blogs/${req.file.filename}`;

    const slug = blogTitle.trim().toLowerCase().replace(/\s+/g, '-')

    const addBlogPost = new blogModel({
        blogTitle: blogTitle,
        blogCategory: blogCategory,
        blogImgFile: blogImgFile,
        blogBody: blogBody,
        userId: user._id,
        slug: slug
    })
    try {
        await addBlogPost.save();
        return res.status(200).json({
            success: true,
            message: 'Blog has been created',
            slug: slug,
            blog: addBlogPost
        })
    } catch (error) {
        // Handle duplicate key error for blogTitle
        if (error.code === 11000 && error.keyPattern && error.keyPattern.blogTitle) {
            return next(errorHandler('A blog with this title already exists. Please choose a different title.', 400));
        }
        next(errorHandler(error.message, 500));
    }
})



// Delete Blog : DELETE API : 

export const deleteBlog = asyncHandler(async (req, res, next) => {

    const { isAdmin } = req.body.user;
    const { blogid, userid } = req.params;



    if (isAdmin || userid) {
        try {
            await blogModel.findByIdAndDelete({ _id: blogid });
            return res.status(200).json({
                success: true,
                message: 'Blog has been deleted'
            })
        } catch (error) {
            next(errorHandler('An error occurred while deleting the blog!', 400));
        }
    } else {
        return next('You are not allowed to delete the blog', 401);
    }
})




// Update blog : PUT API

export const updateBlog = asyncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.params.userid);
    const blog = await blogModel.findById(req.params.blogid);

    if (user.isAdmin || blog.userId === req.params.userid) {
        const updateData = {
            blogTitle: req.body.blogTitle,
            blogCategory: req.body.blogCategory,
            blogBody: req.body.blogBody
        };

        if (req.file) {
            updateData.blogImgFile = `/uploads/blogs/${req.file.filename}`;
        } else if (req.body.blogImgFile) {
            updateData.blogImgFile = req.body.blogImgFile;
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(blog, {
            $set: updateData
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Blog has been updated',
            blog: updatedBlog
        })
    } else {
        return next(errorHandler('An unexpected error occurred while updating blog!', 401));
    }
});
