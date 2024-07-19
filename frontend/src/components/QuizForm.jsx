"use client";

import { useState } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/fetch/quiz";
import { createQuestion } from "@/fetch/question";
import { createAnswer } from "@/fetch/answer";

export default function QuizForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "",
      answers: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleCreate = async () => {
    try {
      if (!title) {
        throw new Error("Quiz title is required");
      }

      if (questions.some((q) => !q.text)) {
        throw new Error("All questions must have text");
      }

      if (questions.some((q) => q.answers.some((a) => !a.text))) {
        throw new Error("All answers must have text");
      }

      const quizResponse = await createQuiz({ title });
      if (!quizResponse || !quizResponse.quiz.id) {
        throw new Error("Failed to create quiz");
      }
      const quizId = quizResponse.quiz.id;

      for (const question of questions) {
        const questionResponse = await createQuestion({
          question: question.text,
          quizId,
        });
        if (!questionResponse || !questionResponse.question.id) {
          throw new Error("Failed to create question");
        }
        const questionId = questionResponse.question.id;

        for (const answer of question.answers) {
          const answerResponse = await createAnswer({
            answer: answer.text,
            isCorrect: answer.isCorrect,
            questionId,
          });

          if (!answerResponse || !answerResponse.answer.id) {
            throw new Error("Failed to create answer");
          }
        }
      }

      router.push("/");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        answers: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleRemoveAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter(
      (_, ansIndex) => ansIndex !== aIndex
    );
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleAnswerIsCorrectChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].isCorrect = value;
    setQuestions(newQuestions);
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

      {questions.map((question, qIndex) => (
        <div key={qIndex} className='w-full'>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text text-lg font-bold'>Question</span>
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='text'
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder='Enter Question'
                className='input input-info input-bordered w-full'
              />
              <div className='tooltip' data-tip='Add New Question'>
                <button
                  type='button'
                  className='btn btn-ghost btn-sm btn-circle'
                  onClick={handleAddQuestion}
                >
                  <CirclePlus />
                </button>
              </div>
              {questions.length > 1 && (
                <div className='tooltip' data-tip='Remove Question'>
                  <button
                    type='button'
                    className='btn btn-ghost btn-sm btn-circle'
                    onClick={() => handleRemoveQuestion(qIndex)}
                  >
                    <CircleMinus color='red' />
                  </button>
                </div>
              )}
            </div>
          </label>

          {question.answers.map((answer, aIndex) => (
            <div key={aIndex} className='flex gap-3 w-full'>
              <label className='form-control flex-1'>
                <div className='label'>
                  <span className='label-text text-lg font-bold'>Answer</span>
                </div>
                <input
                  type='text'
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, e.target.value)
                  }
                  placeholder='Enter Answer'
                  className='input input-info input-bordered w-full'
                />
              </label>

              <label className='form-control flex-1'>
                <div className='label'>
                  <span className='label-text text-lg font-bold'>
                    Answer State
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <select
                    className='select select-info w-full'
                    value={answer.isCorrect}
                    onChange={(e) =>
                      handleAnswerIsCorrectChange(
                        qIndex,
                        aIndex,
                        e.target.value === "true"
                      )
                    }
                  >
                    <option disabled selected>
                      Choose an option
                    </option>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                  </select>
                  <div className='tooltip' data-tip='Add New Answer'>
                    <button
                      className='btn btn-ghost btn-sm btn-circle'
                      onClick={() => handleAddAnswer(qIndex)}
                    >
                      <CirclePlus />
                    </button>
                  </div>
                  {question.answers.length > 2 && (
                    <div className='tooltip' data-tip='Remove Answer'>
                      <button
                        type='button'
                        className='btn btn-ghost btn-sm btn-circle'
                        onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                      >
                        <CircleMinus color='red' />
                      </button>
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      ))}

      <div className='flex w-full justify-center items-center gap-5 mt-5'>
        <button
          type='button'
          className='btn btn-info w-1/2 md:w-1/3'
          onClick={handleCreate}
        >
          Add New Quiz
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
