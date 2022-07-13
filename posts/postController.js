const Post = require("./postModel");
const express = require("express");
const server = express();
const cloudinary = require("../utils/cloudinary");
const path = require("path");
const { schemaPost } = require("../utils/validate-body");
require("dotenv").config();

//---CREATE---//
const createPost = async (req, res) => {
  try {
    //validaciones de post

    const { error } = schemaPost.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // subo image a cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const cloudinary_url = result.url;
    const cloudinary_id = result.public_id;

    //veo si existe titulo
    const isExist = await Post.findOne({ title: req.body.title });
    if (isExist) {
      return res.status(400).json({ error: "El titulo ya existe" });
    }

    //nuevo post con la info de texto y las d claudinary
    const newPost = new Post({ ...req.body, cloudinary_url, cloudinary_id });

    if (
      newPost.save((err, data) => {
        res.status(200).send(data);
      })
    )
      return res.status(200, { message: "Post creado " });
  } catch (error) {
    next(error);
  }
};

//---BUSQUEDA---//
const searchTitleByText = (req, res) => {
  const { query } = req.params;
  Post.find(
    { $text: { $search: query, $caseSensitive: false } },
    (err, result) => {
      if (err) return res.send(err);
      if (!result) return res.send("no hay resultados");
      if (result) return res.send(result);
    }
  );
};

//---GET---//
const getPost = async (req, res, next) => {
  try {
    const result = await Post.find();
    res.send(result);
  } catch (error) {
    (error) => next(error);
  }
};

//---GET ID---//
const getPostById = async (req, res) => {
  try {
    const userId = await Post.findById(req.params.id);
    res.json(userId);
  } catch (error) {
    (error) => next(error);
  }
};

//---UPDATE ID---//
const updatePostById = async (req, res) => {
  try {
    //validaciones de post
    const { error } = schemaPost.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    //traigo post id
    let post = await Post.findById(req.params.id);

    // Delete image de cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);

    // Upload image a cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      //title: req.body.title || post.title,    nadie puede esditar el titulo en el front del lado del cliente
      body: req.body.body || post.body,
      cloudinary_url: result?.url || post.cloudinary_url,
      cloudinary_id: result?.public_id || post.cloudinary_id,
    };

    //new //mantiene a la vista el dato editado { new: true }
    const updata = await Post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    // https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js //
    res.json(updata);
  } catch (error) {
    (error) => next(error);
  }
};

//---DELET---//
const deletPostById = async (req, res) => {
  try {
    // Find user by id
    let post = await Post.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    // Delete user from db
    await Post.deleteOne(post);
    res.json(post);
  } catch (error) {
    (error) => next(error);
  }
};

//manejor de errores NEXT
server.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
  }
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});

module.exports = {
  createPost,
  getPost,
  searchTitleByText,
  getPostById,
  updatePostById,
  deletPostById,
};
