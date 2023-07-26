const {validationResult} = require("express-validator");
const Post = require("../models/post");


exports.getPosts = (req,res,next) => {
    Post.find()
        .then(posts => {
            res
                .status(200)
                .json({message: "fetched posts", posts: posts});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createPost = (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("validation failed");
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/city.jpg",
        creator: {name: "feyz"} 
    });
    post
        .save()
        .then(result => {
            res.status(201).json({
                message: "post created successfully",
                post: result
            });
        })
};

exports.getPost = (req,res,next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if(!post){
                const error = new Error("could not find post");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: "post fetched", post: post });
        })
        .catch(error => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};