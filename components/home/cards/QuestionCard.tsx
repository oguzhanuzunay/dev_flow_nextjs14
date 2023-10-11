import React from "react";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";

interface Props {
  _id: number;
  title: string;
  tags: {
    _id: number;
    name: string;
  }[];
  author: {
    _id: number;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  createdAt,
  upvotes,
  answers,
  views,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`} key={_id}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* If signed in, add edit and delete actions */}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700 leading-normal"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatAndDivideNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>

    // <Link href={`/question/${_id}`} key={_id}>
    //   <div className="background-light900_dark300 light-border rounded-lg border px-9 py-[45px]">
    //     <h3 className="h3-semibold text-dark400_light700 line-clamp-2">
    //       {title}
    //     </h3>
    //     <div className="flex-start mt-[14px] flex w-full items-center gap-2">
    //       {tags.map((tag) => (
    //         <Link href={`/tags/${tag._id}`} key={tag._id}>
    //           <span className="subtle-medium background-light800_dark400  rounded-md px-4 py-2 uppercase text-light-500 shadow-none">
    //             {tag.name}
    //           </span>
    //         </Link>
    //       ))}
    //     </div>

    //     <div className=" mt-6 flex flex-row justify-between">
    //       <div className="flex flex-row items-center gap-2">
    //         <Image
    //           src={author.picture}
    //           alt="user avatar"
    //           width={20}
    //           height={20}
    //           className="invert-colors rounded-full"
    //         />
    //         <div className="flex flex-row">
    //           <span className="body-medium text-dark400_light700">
    //             {author.name}
    //           </span>
    //           <span className="small-regular text-dark400_light700 ml-2 leading-normal">
    //             {`• asked ${moment(createdAt).fromNow()} ago`}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex items-center gap-1">
    //           <Image
    //             src="/assets/icons/like.svg"
    //             alt="votes"
    //             width={18}
    //             height={18}
    //             className={iconClassName}
    //           />
    //           <span className={iconTextClassName}>{upvotes}</span>
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Image
    //             src="/assets/icons/message.svg"
    //             alt="answers"
    //             width={18}
    //             height={18}
    //             className={iconClassName}
    //           />
    //           <span className={iconTextClassName}>{answers}</span>
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Image
    //             src="/assets/icons/eye.svg"
    //             alt="views"
    //             width={18}
    //             height={18}
    //             className={iconClassName}
    //           />
    //           <span className={iconTextClassName}>{views}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default QuestionCard;
