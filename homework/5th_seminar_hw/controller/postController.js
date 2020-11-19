const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const {
    User,
    Post,
    Like
} = require('../models');
const responseMessage = require('../modules/responseMessage');

module.exports = {
    createPost: async (req, res) => {
        const {
            userId,
            title,
            contents
        } = req.body;
        const postImageUrl = req.file.location;
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            }); // 1. user를 Read하는 쿼리
            const post = await Post.create({
                title,
                contents,
                postImageUrl
            }); // 2. post를 create하는 쿼리
            await user.addPost(post); // 3. 방금 생성한 Post에 외래키를 추가해주는 Update 쿼리 (Special Method)
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },

    readAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                attributes: ['title', 'contents'],
                include: [{
                    model: User,
                    attributes: ['id', 'userName', 'email'],
                }, {
                    model: User,
                    as: 'Liker',
                    attributes: { exclude: ['password', 'salt', 'id', 'email']}
                }]
            });
            console.log(JSON.stringify(posts, null, 2));
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, posts));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_FAIL));
        }
    },
    createLike: async (req, res) => {
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try {
            const like = await Like.create({ PostId, UserId });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_LIKE_SUCCESS, like));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL));
        }
    },
    deleteLike: async (req, res) => {
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try {
            await Like.destroy( {
                where: {
                    UserId,
                    PostId
                },
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.DELETE_LIKE_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.DELETE_LIKE_FAIL));
        }
    },
}