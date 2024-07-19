import QuizList from "@/components/QuizList";

export default function QuizPage({ params }) {
  return <QuizList slug={params.slug} />;
}
