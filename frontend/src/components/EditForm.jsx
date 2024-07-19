"use client";

import { useState, useEffect } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { findQuiz, updateQuiz } from "@/fetch/quiz";
import { findAllQuestions, updateQuestion } from "@/fetch/question";
import { findAllAnswers, updateAnswer } from "@/fetch/answer";

export default function EditForm({ slug }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await findQuiz(slug);
        if (quizData && quizData.quiz) {
          setQuiz(quizData.quiz);
          setTitle(quizData.quiz.title);
        }

        const questionData = await findAllQuestions({
          quizId: quizData.quiz.id,
        });
        if (questionData && questionData.questions) {
          setQuestions(questionData.questions);

          const allAnswers = [];

          for (const question of questionData.questions) {
            const answerData = await findAllAnswers({
              questionId: question.id,
            });
            if (answerData && answerData.answers) {
              allAnswers.push(...answerData.answers);
            }
          }

          setAnswers(allAnswers);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [slug]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleEdit = async () => {
    try {
      const quizData = await updateQuiz(slug, { title });
      if (quizData && quizData.quiz) {
        setQuiz(quizData.quiz);
        setTitle(quizData.quiz.title);
      }

      const updatedQuestions = [];
      for (const question of questions) {
        const questionData = await updateQuestion(question.id, {
          question: question.question,
        });
        if (questionData && questionData.question) {
          updatedQuestions.push(questionData.question);
        }
      }
      setQuestions(updatedQuestions);

      const updatedAnswers = [];
      for (const answer of answers) {
        const answerData = await updateAnswer(answer.id, {
          answer: answer.answer,
          isCorrect: answer.isCorrect,
        });
        if (answerData && answerData.answer) {
          updatedAnswers.push(answerData.answer);
        }
      }
      setAnswers(updatedAnswers);

      router.push("/");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionId, answerId, value) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId && answer.id === answerId
          ? { ...answer, answer: value }
          : answer
      )
    );
  };

  const handleIsCorrectChange = (questionId, answerId, value) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId && answer.id === answerId
          ? { ...answer, isCorrect: value === "true" }
          : answer
      )
    );
  };

  return (
    <div className='flex flex-col mx-auto justify-center items-center gap-3 w-5/6'>
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text text-lg font-bold'>Quiz Title</span>
        </div>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Quiz Title'
          className='input input-info input-bordered w-full'
        />
      </label>

      {questions.map((question, questionIndex) => (
        <label key={question.id} className='form-control flex-1 w-full gap-3'>
          <div className='label'>
            <span className='label-text text-lg font-bold'>
              {questionIndex + 1}. Question
            </span>
          </div>
          <input
            type='text'
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
            placeholder='Enter Question Text'
            className='input input-info input-bordered w-full'
          />

          <div className='label'>
            <span className='label-text text-lg font-bold'>Answers</span>
          </div>
          {answers
            .filter((answer) => answer.questionId === question.id)
            .map((answer) => (
              <div key={answer.id} className='flex items-center gap-3'>
                <input
                  type='text'
                  value={answer.answer}
                  onChange={(e) =>
                    handleAnswerChange(question.id, answer.id, e.target.value)
                  }
                  placeholder='Enter Answer Text'
                  className='input input-info input-bordered w-full'
                />
                <select
                  className='select select-info'
                  value={answer.isCorrect ? "true" : "false"}
                  onChange={(e) =>
                    handleIsCorrectChange(
                      question.id,
                      answer.id,
                      e.target.value
                    )
                  }
                >
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </select>
              </div>
            ))}
        </label>
      ))}

      <div className='flex w-full justify-center items-center gap-5 mt-5'>
        <button
          type='button'
          className='btn btn-info w-1/2 md:w-1/3'
          onClick={handleEdit}
        >
          Save Changes
        </button>

        <button
          type='button'
          className='btn btn-neutral w-1/2 md:w-1/3'
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
