"use server";

import { ViewQuestionParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.modell";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // update view count for the question

    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      // create an interaction record
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        return console.log("user already viewed this question");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
