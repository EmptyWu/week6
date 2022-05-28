const Post = require('../models/posts.model');
const {appError,successHandle} = require('../services/FinishHandle.service');

const postsController = {
    // 全部
    async get(req, res, next) {
        let sort = req.body.timeSort ;
        let search = req.body.q;
        let data = '';
        console.log(sort);
        if(sort == undefined) sort = -1
        if(search == undefined) search = ''
        if(search == '') {
            data = await Post.find().sort({createAt: sort}).populate({
                path: 'user',
                select: 'name image sex'
            }).populate({
                path: 'replies',
                select: 'user content'
            });
        } else {
            data = await Post.find({
                content: {$regex: search}
            }).sort({createAt: sort}).populate({
                path: 'user',
                select: 'name image sex'
            }).populate({
                path: 'replies',
                select: 'user content'
            });
        }
        successHandle(res,data);
        
        
    },
    // 新增
    async create(req, res, next) {
        const data = req.body
        const arg = ['user_id', 'tags', 'type', 'content']
        const result = await arg.filter(key => data[key] == '' || data[key] == undefined)
        if(result.length > 0) {
            return next(appError(400, `${result.toString()} 欄位不正確`, next));
        }
        const post = await Post.create({
            user: data.user_id,
            tags: data.tags,
            type: data.type,
            image: data.image,
            createAt: data.createAt,
            content: data.content,
            likes: data.likes,
            comments: data.comments
        });
        successHandle(res,post);
        
    },
    // 刪除 -全部
    async delete(req, res, next) {
        await Post.deleteMany({});
        const posts = await Post.find();
        successHandle(res,posts);
       
    },
    // 刪除 -單筆
    async deleteQuery(req, res, next) {
        const id = req.params.id
        const result = await Post.findByIdAndDelete(id);
        const posts = await Post.find();
        if(result == null) { 
            next(appError(400, `無此筆id`, next));
     } else {
        successHandle(res,posts);
        
     }
    },
    // 編輯 -單筆
    async editQuery(req, res, next) {
        const id = req.params.id
        const data = req.body
        const arg = ['name', 'tags', 'type', 'content']
        const result = await arg.filter(key => data[key] == '' || data[key] == undefined)
        if(result.length > 0) {
            return next(appError(400, `${result.toString()} 欄位不正確`, next))
        }
        const posts = await Post.findByIdAndUpdate(id, data, { new: true});
        if(posts == null) next(appError(400, `${res} `, next))
        else {
            successHandle(res,posts);
           }
    }
}

module.exports = postsController;