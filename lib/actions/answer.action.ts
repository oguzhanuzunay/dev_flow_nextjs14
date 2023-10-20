"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";

import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    
    revalidatePath(path);

    return newAnswer;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page, pageSize } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, UpdateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, UpdateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation bu +10 for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
