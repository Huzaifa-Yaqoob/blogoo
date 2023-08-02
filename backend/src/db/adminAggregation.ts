import { Report, User, Blog } from "./database";
import { project, userLookup, addFields } from "./BlogsAggregation";

const reportLookup = {
  from: "reports",
  let: { reports_id: "$reports_id" },
  pipeline: [
    {
      $match: {
        $expr: {
          $in: ["$_id", "$$reports_id"],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "reporter_id",
        foreignField: "_id",
        as: "reporter",
      },
    },
    // {
    //   $unwind: "$reporter"
    // },
  ],
  as: "reportData",
};

export const getAllReports = async () => {
  return await Blog.aggregate([
    {
      $match: {
        reports_id: { $exists: true, $ne: [] },
      },
    },
    { $lookup: userLookup },
    { $lookup: reportLookup },
    // {
    //   $addFields: {
    //     ...addFields,
    //     reportsCount: { $size: "$reports" },
    //   },
    // },
    // {
    //   $project: {
    //     ...project,
    //   },
    // },
    { $limit: 20 },
  ]);
};
