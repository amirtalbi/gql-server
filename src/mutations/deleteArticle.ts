import { MutationResolvers } from "../types";

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { articleId, userId }, { dataSources }) => {
    try {
        if (!articleId || !userId) {
            throw new Error('Invalid parameters')
        }

        await dataSources.db.article.deleteMany({
            where: { userId: userId, id: articleId },
        });

        return {
            code: 200,
            message: 'Article delete',
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