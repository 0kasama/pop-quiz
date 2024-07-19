"use client";

import { useEffect, useState } from "react";
import { findAllAnswers } from "@/fetch/answer";

export default function AnswerList({ questionId, onAnswerSelect }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answerData = await findAllAnswers({ questionId });
        if (answerData && answerData.answers) {
          setAnswers(answerData.answers);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [questionId]);

  const handleAnswerSelect = (selectedAnswer) => {
    onAnswerSelect(selectedAnswer);
  };

  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.id} className=" items-center">
          <div className='form-control'>
            <label className='label cursor-pointer justify-start'>
              <input
                type='radio'
                name={`radio-${questionId}`}
                className='radio checked:bg-blue-500'
                onChange={() => handleAnswerSelect(answer)}
              />
              <span className='label-text pl-2'>{answer.answer}</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
