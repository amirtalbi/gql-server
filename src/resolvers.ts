import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/createUser.js";
import { signIn } from "./mutations/signIn.js";
import { createArticle } from "./mutations/createArticle.js";
import { createComment } from "./mutations/createComment.js";
import { likeArticle, unlikeArticle } from "./mutations/likeArticle.js";
import { deleteComment } from "./mutations/deleteComment.js";
import { deleteArticle } from "./mutations/deleteArticle.js";
import { updateArticle } from "./mutations/updateArticle.js";

export const resolvers: Resolvers = {
  Query: {
    getArticles: async (_, __, { dataSources }) => {
      const articles = await dataSources.db.article.findMany({
        include: {
          comments: true,
          likes: true,
        }
      },
      )

      if (!articles || articles.length === 0) {
        throw new GraphQLError("No articles found");
      }
      // Cast the userId, articleId, and commentId to string to avoid string | null
      return articles.map(article => ({
        ...article,
        userId: article.userId as string,
        comments: article.comments.map(comment => ({
          ...comment,
          userId: comment.userId as string,
          articleId: comment.articleId as string,
        })),
        likes: article.likes.map(like => ({
          ...like,
          userId: like.userId as string,
          articleId: like.articleId as string,
        })),
      }));
    },
  },
  Mutation: {
    createUser: createUser,
    signIn: signIn,
    createArticle: createArticle,
    createComment: createComment,
    likeArticle: likeArticle,
    unlikeArticle: unlikeArticle,
    deleteComment: deleteComment,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle
  },
}