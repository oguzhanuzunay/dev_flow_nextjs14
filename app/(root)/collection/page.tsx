import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/home/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function page() {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold ">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search Questions"
          otherClasses="flex-1"
        />
        <Filter
          placeHolder="Select a Filter"
          filterList={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length !== 0 ? (
          result.questions.map((question) => (
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
            title="There&rsquo;s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. your query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
