const { addBlog, Updateblog, DeleteBlog, GetAllBlogs, GetBlogById, } = require('../controllers/blogCont')

const blogRouter=require('express').Router()

blogRouter.post('/addBlog',addBlog)
blogRouter.put('/update-blog/:id',Updateblog)
blogRouter.delete('/delete-blog/:id',DeleteBlog)
blogRouter.get('/allblogs',GetAllBlogs)
blogRouter.get('/:id',GetBlogById)
module.exports=blogRouter