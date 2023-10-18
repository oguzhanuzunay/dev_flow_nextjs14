"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(param: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = param;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // TODO: Interactions are not yet implemented

    return [
      { _id: 1, name: "tag1" },
      { _id: 2, name: "tag2" },
      { _id: 3, name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(param: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 10, filter, searchQuery } = param;

    const tags = await Tag.find({});

    // Find interactions for the user and group by tags...
    // TODO: Interactions are not yet implemented

    return {tags};
  } catch (error) {
    console.log(error);
    throw error;
  }
}
