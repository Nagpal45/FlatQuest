import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query;
    let userId = null;

    try {
        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (!err) {
                    userId = payload.id;
                }
            });
        }

        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000
                }
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        if (userId) {
            const savedPosts = await prisma.savedPost.findMany({
                where: { userId },
                select: { postId: true }
            });

            const savedPostIds = new Set(savedPosts.map(post => post.postId));

            const postsWithSavedStatus = posts.map(post => ({
                ...post,
                isSaved: savedPostIds.has(post.id)
            }));

            res.status(200).json(postsWithSavedStatus);
        } else {
            const postsWithSavedStatus = posts.map(post => ({
                ...post,
                isSaved: false
            }));

            res.status(200).json(postsWithSavedStatus);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get posts' });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });
        let userId;
        const token = req.cookies?.token;

        if(!token) {
            userId = null;
            return res.status(200).json({ ...post, isSaved: false });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if(err) {
                    userId = null;
                } else {
                    userId = payload.id;
                }
            });
        }
        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: id
                }
            }
        });

        res.status(200).json({ ...post, isSaved: saved ? true : false });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get post' });
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                }
            }
        });
        res.status(201).json(newPost);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to add post' });
    }
}

export const updatePost = async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update post' });
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }

        await prisma.postDetail.delete({
            where: { postId: id }
        });

        await prisma.savedPost.deleteMany({
            where: { postId: id }
        });

        await prisma.post.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
}