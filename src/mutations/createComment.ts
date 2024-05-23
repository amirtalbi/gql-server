import { MutationResolvers } from "../types.js";

export const createComment: MutationResolvers['createComment'] = async (_, { content, userId, articleId }, { dataSources }) => {
    try {
        const createdComment = await dataSources.db.comment.create({
            data: { content: content, userId: userId, articleId: articleId },
        });

        return {
            code: 201,
            message: 'Comment has been created',
            success: true,
            comment: {
                id: createdComment.id,
                content: createdComment.content,
                userId: userId,
                articleId: articleId
            }
        }
    }
    catch (e) {
        return {
            code: 400,
            message: (e as Error).message,
            success: false,
            comment: null
        }
    }
}