"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "name _id",
      })
      .populate({
        path: "author",
        model: User,
        select: "username picture clerkId",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let UpdateQuery = {};

    if (hasupVoted) {
      UpdateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      UpdateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      UpdateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, UpdateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation bu +10 for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let UpdateQuery = {};

    if (hasdownVoted) {
      UpdateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasupVoted) {
      UpdateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      UpdateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, UpdateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation bu +10 for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
