const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")



const createBlog = async function (req, res) {
    try {
        const data = req.body
        console.log(typeof (data.tags))
        if (data.title == null || (typeof (data.title) != "string")) {
            return res.status(400).send("title  should not be empty and should be string")
        }
        if (data.title.trim().length == 0) {
            return res.status(400).send("title should not be blank")
        }

        if (data.body == null || (typeof (data.body) != "string")) {
            return res.status(400).send("body should not be empty")
        }

        if (data.body.trim().length == 0) {
            return res.status(400).send(" body should not be blank")
        }

        if (data.category == null || (typeof (data.category) != "string")) {
            return res.status(400).send("category should not be empty")
        }

        if (data.category.trim().length == 0) {
            return res.status(400).send(" category should not be blank")
        }
        console.log(data.tags)
        // if (data.tags == null) {
        //     return res.status(400).send(" tags should not be null or empty")
        // }
        if (data.tags != null) { //bcoz not required true

            if (typeof (data.tags) == "object") {
                if (data.tags.length == 0) {
                    return res.status(400).send("tags should not be empty")
                }
                for (i = 0; i < data.tags.length; i++) {
                    if (typeof (data.tags[i]) != "string") {
                        return res.status(400).send("tags should be array of string")
                    } console.log(data.tags)
                    if (data.tags.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" tags should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.tags) != "string") {
                    return res.status(400).send("tags should be string ")
                }
                if (data.tags.trim().length == 0) {
                    return res.status(400).send(" tags should not be blank")
                }
            }
        }


        if (data.subcategory != null) { //bcoz not required true

            if (typeof (data.subcategory) == "object") {
                if (data.subcategory.length == 0) {
                    return res.status(400).send("subcategory should not be empty")
                }
                for (i = 0; i < data.subcategory.length; i++) {
                    if (typeof (data.subcategory[i]) != "string") {
                        return res.status(400).send("subcategory should be array of string")
                    }
                    if (data.subcategory.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" subcategory should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.subcategory) != "string") {
                    return res.status(400).send("subcategory should be string ")
                }
                if (data.subcategory.trim().length == 0) {
                    return res.status(400).send(" subcategory should not be blank")
                }
            }
        }


        const user = await authorModel.findById(data.authorId)
        if (!user) return res.status(400).send({ status: false, msg: "Enter the Valid Author Id" })
        const saveData = await blogModel.create(data)
        res.status(201).send({ status: true, data: saveData })


    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


//???? why if we are giving wrong tags in query it is not checking that e.g give some key which is not in schema e.g{abcd:ghj} pic taken at 11:12(23-06-22)

const getBlogData = async function (req, res) {
    try {
        const data = req.query
        if (Object.keys(data).length == 0) return res.status(400).send("data empty")
        data.isDeleted = false
        data.isPublished = true
        console.log(data)
        const result = await blogModel.find(data)
        if (result.length == 0) {
            return res.status(404).send("data not found")
        }
        // console.log(result)
        return res.status(200).send({ status: true, msg: result })

    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

const updateBlog = async function (req, res) {

    try {
        // const blogId = req.params.blogId;
        // console.log(blogId)
//==========================================================
const blogId = req.params.blogId
        //console.log(blogId)

        var l = blogId.length
        if (l != 24) { return res.status(400).send("Invalid Id") }

        const id = await blogModel.find({ _id: blogId })

        if (id.length == 0) { return res.status(404).send("no such blogId found in DB atleast put data available in database then we check if authorized or same author and not deleted ") }
        const author22 = id[0].authorId

        //console.log("in handler",author22) 

        if (req.authorlogedin.ObjectId != author22) { return res.status(403).send("Not Authorize ") }









        //=========================================
        const isavailable = await blogModel.find({ _id: blogId, isDeleted: false });
        if (isavailable.length == 0) { return res.status(404).send("no blog data found") }

        const data = req.body
        if(Object.keys(data).length==0){return res.status(400).send("can't be empty")}

        if (data.title == null) {
            // console.log(data.title)
        }
        else {
            console.log("In title else")
            if (data.title != null && typeof (data.title) != "string") {
                console.log("trim")
                return res.status(400).send("title  should be string")
            }
            if (data.title.trim().length == 0) {
                return res.status(400).send("title should not be blank")
            }
        }


        if (data.body == null) {
            console.log("bolg body",data.body)
        }
        else {
            console.log("In body else of body of blog")
            if (data.body != null && typeof (data.body) != "string") {
                console.log("trim of body blog")
                return res.status(400).send("body  should be string")
            }
            if (data.body.trim().length == 0) {
                return res.status(400).send("body should not be blank")
            }
        }

        if (data.category == null) {
            console.log("category of body",data.category)
        }
        else {
            console.log("In category else")
            if (data.category != null && typeof (data.category) != "string") {
                console.log("in category trim")
                return res.status(400).send("category  should be string")
            }
            if (data.category.trim().length == 0) {
                return res.status(400).send("category should not be blank")
            }
        }
        //================================================================
        console.log("tags datatype =",typeof (data.tags), )
        if (data.tags != null) { //bcoz not required true

            if (typeof (data.tags) == "object") {
                if (data.tags.length == 0) {
                    return res.status(400).send("tags should not be empty")
                }
                for (i = 0; i < data.tags.length; i++) {
                    if (typeof (data.tags[i]) != "string") {
                        return res.status(400).send("tags should be array of string")
                    }// console.log(data.tags)
                    if (data.tags.toString().trim().length == 0) {
                        console.log("In tags Trim")
                        return res.status(400).send(" tags should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.tags) != "string") {
                    return res.status(400).send("tags should be string ")
                }
                if (data.tags.trim().length == 0) {
                    return res.status(400).send(" tags should not be blank")
                }
            }
        }


        if (data.subcategory != null) { //bcoz not required true

            if (typeof (data.subcategory) == "object") {
                if (data.subcategory.length == 0) {
                    return res.status(400).send("subcategory should not be empty inside array")
                }
                for (i = 0; i < data.subcategory.length; i++) {
                    if (typeof (data.subcategory[i]) != "string") {
                        return res.status(400).send("subcategory should be array of string")
                    }
                    if (data.subcategory.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" subcategory should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.subcategory) != "string") {
                    return res.status(400).send("subcategory should be string ")
                }
                if (data.subcategory.trim().length == 0) {
                    return res.status(400).send(" subcategory should not be blank")
                }
            }
        }

        data.isPublished = true
        data.publishedAt = Date.now()
        let updatedBlog = await blogModel.findByIdAndUpdate(blogId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, isPublished: data.isPublished, publishedAt: data.publishedAt }, { new: true })
        // updatedBlog1 = await blogModel.findByIdAndUpdate(blogId, {  }, { new: true })
        // updatedBlog2 = await blogModel.findByIdAndUpdate(blogId, { $push: { subcategory: data.subcategory } }, { new: true })

        return res.status(200).send({ status: true, data: updatedBlog })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

};


const deleteBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        //console.log(blogId)

        var l = blogId.length
        if (l != 24) { return res.status(400).send("Invalid Id") }

        const id = await blogModel.find({ _id: blogId })

        if (id.length == 0) { return res.status(404).send("no data found ") }
        const author22 = id[0].authorId

        //console.log("in handler",author22) 

        if (req.authorlogedin.ObjectId != author22) { return res.status(403).send("Not Authorize ") }

        const result = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        //console.log("pr result",result)
        if (!result) { return res.status(404).send("no such data  exist") }

        return res.status(200).send({ status: "true" })
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}

const deleteBlogByQuerry = async function (req, res) {
    try {
        const data = req.query
      
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "data required" })
        //console.log(data)
        data.isDeleted = false
        console.log(data)

        const toCheckQuery = await blogModel.find(data)
        //console.log(toCheckQuery[0].subcategory)
        console.log(toCheckQuery, "in handler of query delete")

        //console.log(data)
        if (toCheckQuery.length == 0) {return res.status(404).send({msg:"no data exist"})}

        const blogDeleted = await blogModel.updateMany(data, { isDeleted:true }, { new: true })
        //console.log(blogDeleted)
        if (blogDeleted.modifiedCount == 0) return res.status(400).send({msg:"User already deleted"})
        res.status(200).send({ status: true })
    }
    catch (err) {
        res.status(500).send(err.message)

    }
}

module.exports.createBlog = createBlog
module.exports.getBlogData = getBlogData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuerry = deleteBlogByQuerry