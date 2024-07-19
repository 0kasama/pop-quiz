"use client";

import { useEffect, useState } from "react";
import { findAllQuestions } from "@/fetch/question";
import AnswerList from "./AnswerList";

export default function QuestionList({ quizId, onAnswerSelect }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionData = await findAllQuestions({ quizId });
        if (questionData && questionData.questions) {
          setQuestions(questionData.questions);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [quizId]);

  return (
    <div>
      {questions
        .sort((a, b) => a.id - b.id)
        .map((question, index) => (
          <div
            key={question.id}
            className='w-5/6 md:w-2/3 mx-auto border-b border-slate-500 mb-5 pb-5'
          >
            <p className='text-left mb-2'>
              {index + 1}. {question.question}
            </p>
            <AnswerList
              questionId={question.id}
              onAnswerSelect={onAnswerSelect}
            />
          </div>
        ))}
    </div>
  );
}
