import { MutationResolvers } from "../types.js";

export const likeArticle: MutationResolvers['likeArticle'] = async (_, { articleId, userId }, { dataSources }) => {
    try {
        if (!articleId || !userId) {
            throw new Error('Invalid parameters')
        }

        await dataSources.db.like.create({
            data: { userId: userId, articleId: articleId },
        });

        return {
            code: 200,
            message: 'Liked',
            success: true
        }
    } catch (e) {
        return {
            code: 403,
            message: (e as Error)?.message ?? 'An error occured',
            success: false
        }
    }
}

export const unlikeArticle: MutationResolvers['unlikeArticle'] = async (_, { articleId, userId }, { dataSources }) => {
    try {
        if (!articleId || !userId) {
            throw new Error('Invalid parameters')
        }

        await dataSources.db.like.deleteMany({
            where: {
                articleId: articleId,
                userId: userId
            }
        });

        return {
            code: 200,
            message: 'unliked',
            success: true
        }
    } catch (e) {
        return {
            code: 403,
            message: (e as Error)?.message ?? 'An error occured',
            success: false
        }
    }
}