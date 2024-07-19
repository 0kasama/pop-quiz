"use client";

import { useState, useEffect } from "react";
import { findQuiz } from "@/fetch/quiz";
import { createScore } from "@/fetch/score";
import { useRouter } from "next/navigation";
import QuestionList from "@/components/QuestionList";

export default function QuizList({ slug }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await findQuiz(slug);
        if (quizData && quizData.quiz) {
          setQuiz(quizData.quiz);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [slug]);

  const handleAnswerSelection = (answer) => {
    const questionId = answer.questionId;

    const isQuestionAlreadySelected = selectedAnswers.some(
      (selectedAnswer) => selectedAnswer.questionId === questionId
    );

    if (isQuestionAlreadySelected) {
      setSelectedAnswers((prevSelectedAnswers) =>
        prevSelectedAnswers.map((prevAnswer) =>
          prevAnswer.questionId === questionId ? answer : prevAnswer
        )
      );
    } else {
      setSelectedAnswers((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        answer,
      ]);
    }

    const isCorrectAnswer = answer.isCorrect;

    if (isCorrectAnswer) {
      const isCorrectAlreadySelected = correctAnswers.some(
        (selectedAnswer) => selectedAnswer.questionId === questionId
      );

      if (isCorrectAlreadySelected) {
        setCorrectAnswers((prevCorrectAnswers) =>
          prevCorrectAnswers.map((prevAnswer) =>
            prevAnswer.questionId === questionId ? answer : prevAnswer
          )
        );
      } else {
        setCorrectAnswers((prevCorrectAnswers) => [
          ...prevCorrectAnswers,
          answer,
        ]);
      }
    } else {
      setCorrectAnswers((prevCorrectAnswers) =>
        prevCorrectAnswers.filter(
          (prevAnswer) => prevAnswer.questionId !== questionId
        )
      );
    }
  };

  const handleSubmitAnswers = () => {
    if (selectedAnswers.length === 0) {
      console.log("No answers selected.");
      return;
    }
    const score = (correctAnswers.length / selectedAnswers.length) * 100;

    try {
      const scoreData = createScore({ score, quizId: quiz.id });
      router.push("/")
    } catch (err) {
      console.error("Error creating score", err);
    }
  };

  return (
    <div className='flex flex-col mt-10'>
      {quiz && (
        <div key={quiz.id} className='text-center'>
          <h2 className='font-bold text-3xl mb-10'>{quiz.title}</h2>
          <QuestionList
            quizId={quiz.id}
            onAnswerSelect={handleAnswerSelection}
          />
          <div>
            <button
              className='btn btn-info w-5/6 md:w-2/3'
              onClick={handleSubmitAnswers}
            >
              Submit Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
