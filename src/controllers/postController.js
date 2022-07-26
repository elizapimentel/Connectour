const PostSchema = require('../models/postSchema');

const creatPost = async (req, res) => {
    const { city, attractionName, opening_hours, address, description } = req.body;
    if(!opening_hours) {
        return res.status(405).send({message: "all items must be fill in"})
    }
    try {
        const newPost = new PostSchema ({ city, attractionName, address, description, opening_hours, createdAt: new Date().toLocaleDateString() });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const allPosts = await PostSchema.find()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(404).send({message: message.error})
    }
}

const getByName = async (req, res) => {
    const { city, attractionName } = req.query
    let query = {}
    if(city) query.city = new RegExp(city, 'i')
    if(attractionName) query.attractionName = new RegExp(attractionName, 'i')   
    try {
        const searchByAttractionName = await PostSchema.find(query)
        res.status(200).json(searchByAttractionName)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const updatePost = async (req, res) => {
    const { city, attractionName, opening_hours, address, description } = req.body
    try {
        const id = req.params.id
        const postUpdated = await PostSchema.findByIdAndUpdate(id, { city, attractionName, opening_hours, address, description, updatedAt: new Date().toLocaleDateString() }, { new: true })
        if(!id) throw new Error({
            "message": "Id not found"
        })
        res.status(200).send(postUpdated)
    } catch (error) {
        res.status(404).send({ message: message.error })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await PostSchema.findByIdAndDelete(req.params.id)
        if(!post) {
            return res.status(404).send({ message: "Post not found"})
        }
        res.status(200).send({
            "message": "Post deleted",
            "post": post
        })        
    } catch (error) {
        res.status(404).send({message: message.error})
    }
}

module.exports = {
    creatPost,
    getAll,
    getByName,
    updatePost,
    deletePost
}