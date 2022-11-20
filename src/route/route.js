const express= require('express')
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware = require("../middleware/middleware")


router.get("/test-me", function(req, res){
    console.log("hi sweta")
    res.status(200).send({msg:"welcome"})
})
// ================== author ==============================//

//  create author 
router.post('/authors', authorController.createAuthor)    

//  login api
router.post('/login',authorController.login)

// ================= blogs===========================//

// bolgs create
router.post('/blogs',middleware.authentication, blogController.createBlog) 


// blogs  get
router.get('/blogs',middleware.authentication, blogController.getblogData) 

// blogs  update 
router.put('/blogs/:blogid',middleware.authentication,middleware.authorization,blogController.update) // 


// ==================== delet=======================//


//  delet blogs one id 
router.delete('/blog/:blogid', middleware.authentication,middleware.authorization,blogController.blogsDeleted) //blogsdelet



//  delet blog  for query
router.delete('/blogs',middleware.authentication , blogController.blogsdetails) 




module.exports = router;

