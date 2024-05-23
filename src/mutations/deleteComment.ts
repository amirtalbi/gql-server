import { MutationResolvers } from "../types";

export const deleteComment: MutationResolvers['deleteComment'] = async (_, { articleId, userId }, { dataSources }) => {
    try {
        if (!articleId || !userId) {
            throw new Error('Invalid parameters')
        }

        await dataSources.db.comment.deleteMany({
            where: { userId: userId, articleId: articleId },
        });

        return {
            code: 200,
            message: 'Comment delete',
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