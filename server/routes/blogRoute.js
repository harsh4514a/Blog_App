import express from 'express';
const blogRouter = express.Router();
import { postBlog, getAllBlogs, deleteBlog, updateBlog } from '../controller/blogController.js';
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';
import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

blogRouter.post('/post-blog', verifyUserMiddleware, upload.single('blogImgFile'), postBlog)
    .get('/get-all-blogs', getAllBlogs)
    .delete('/delete-blog/:blogid/:userid', verifyUserMiddleware, deleteBlog)
    .put('/update-blog/:blogid/:userid', verifyUserMiddleware, upload.single('blogImgFile'), updateBlog)






export default blogRouter;