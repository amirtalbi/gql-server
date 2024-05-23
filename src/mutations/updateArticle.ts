import { MutationResolvers } from "../types.js";

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, content }, { dataSources }) => {
    try {
        const updatedArticle = await dataSources.db.article.update({
            where: { id: id },
            data: { content: content}
        });

        return {
            code: 200,
            message: 'Article has been updated',
            success: true,
            article: {
                id: updatedArticle.id,
                content: updatedArticle.content,
                userId: updatedArticle.userId
            }
        }
    }
    catch (e) {
        return {
            code: 400,
            message: (e as Error).message,
            success: false,
            article: null
        }
    }
}