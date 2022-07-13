const router = require("express").Router();
require("../utils/validate-body")
const { createPost, searchTitleByText, getPost, getPostById, updatePostById,deletPostById} = require("./postController");
const upload = require("../utils/multer");

//----RUTAS POSTS----//
router.get("/", getPost);
router.get("/id/:id",getPostById);
router.patch("/patch/:id",upload.single("file"),updatePostById);
router.delete("/delete/:id",deletPostById);

router.post("/create",upload.single("file"), createPost);
router.get("/:query", searchTitleByText);

module.exports = router;
