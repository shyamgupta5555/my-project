const express= require('express')
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware = require("../middleware/middleware")


router.get("/test-me", function(req, res){
    console.log("hi sweta")
    res.status(200).send({msg:"welcome"})
})

router.post('/authors', authorController.createAuthor)    //author create


////1
router.post('/blog',middleware.authentication, blogController.createBlog) //blogs create


////2
router.get('/blogData/:blogid',middleware.authentication, blogController.getblogData) // no id only use query param

///3
router.put('/blogs/:blogid',middleware.authentication,middleware.authorization,blogController.update) // 


///4

router.put('/blog/:blogid', middleware.authentication,middleware.authorization,blogController.blogsDeleted) //blogsdelet



//5
router.put('/blogss',middleware.authentication , blogController.blogsdetails) // blogs details


router.post('/login',authorController.login)

module.exports = router;

