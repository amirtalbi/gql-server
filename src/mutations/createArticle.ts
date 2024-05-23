import { MutationResolvers } from "../types.js";

export const createArticle: MutationResolvers['createArticle'] = async (_, { content, userId }, { dataSources }) => {
    try {
        const createdArticle = await dataSources.db.article.create({
            data: { content: content, userId: userId},
        });

        return {
            code: 201,
            message: 'Article has been created',
            success: true,
            article: {
                id: createdArticle.id,
                content: createdArticle.content,
                userId: userId
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
