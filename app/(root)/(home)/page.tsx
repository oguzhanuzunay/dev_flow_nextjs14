import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/home/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";

const questions = [
  {
    _id: 1,
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "react.js" },
      { _id: 3, name: "invalid fields" },
      { _id: 4, name: "salesforce" },
    ],
    author: {
      _id: 1,
      name: "David",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 1200,
    views: 2000,
    answers: [
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
    ],
    createdAt: new Date("October 10, 2023 20:29:00"),
  },
  {
    _id: 2,
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "react.js" },
      { _id: 3, name: "invalid fields" },
      { _id: 4, name: "salesforce" },
    ],
    author: {
      _id: 1,
      name: "David",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 1200,
    views: 2000,
    answers: [
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
      {
        /* Add answer objects here */
      },
    ],
    createdAt: new Date("October 11, 2023 20:29:00"),
  },
  {
    _id: 3,
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "react.js" },
      { _id: 3, name: "invalid fields" },
      { _id: 4, name: "salesforce" },
    ],
    author: {
      _id: 1,
      name: "David",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 1200,
    views: 2000,
    answers: [
      {
        /* Add answer objects here */
      },
    ],
    createdAt: new Date("january 11, 2023 20:29:00"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold ">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search Questions"
          otherClasses="flex-1"
        />
        <Filters
          placeHolder="Select Filter"
          filterList={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex "
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length !== 0 ? (
          questions.map((question) => (
            <QuestionCard
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              createdAt={question.createdAt}
              views={question.views}
              answers={question.answers}
              key={question._id}
            />
          ))
        ) : (
          <NoResult
            title="There&rsquo;s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. your query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
