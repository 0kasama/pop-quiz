"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { findAllQuizzes, destroyQuiz } from "@/fetch/quiz";
import { findAllScores } from "@/fetch/score";
import { findUser } from "@/fetch/user";
import ScoreBadge from "./ScoreBadge";
import Link from "next/link";

export default function QuizCard() {
  const [user, setUser] = useState();
  const [quizzes, setQuizzes] = useState([]);
  const [quizIdToDelete, setQuizIdToDelete] = useState();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await findUser();
        if (userData) {
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await findAllQuizzes();
        if (data && data.quizzes) {
          setQuizzes(data.quizzes);
        }
      } catch (err) {
        console.error("Error fetching quizzes", err);
      }
    };

    const fetchScores = async () => {
      try {
        const data = await findAllScores();
        if (data && data.scores) {
          setScores(data.scores);
        }
      } catch (err) {
        console.error("Error fetching scores", err);
      }
    };

    fetchQuizzes();
    fetchScores();
  }, []);

  const handleConfirmModal = (quizId) => {
    setQuizIdToDelete(quizId);
    document.getElementById("deleteQuiz").showModal();
  };

  const handleDelete = async () => {
    try {
      await destroyQuiz(quizIdToDelete);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizIdToDelete));
      setQuizIdToDelete();
      document.getElementById("deleteQuiz").close();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className='flex flex-col flex-wrap md:flex-row gap-4 justify-center items-center'>
      {quizzes.map((quiz) => {
        const score = scores.find((s) => s.quizId === quiz.id);
        return (
          <div
            key={quiz.id}
            className='card bg-info text-info-content w-80 h-32 shadow-xl relative'
          >
            {score ? (
              <div className='card-body justify-center items-center'>
                <h2 className='card-title text-3xl'>{quiz.title}</h2>
                <ScoreBadge quizId={quiz.id} />
              </div>
            ) : (
              <Link href={`/quiz/${quiz.slug}`}>
                <div className='card-body justify-center items-center'>
                  <h2 className='card-title text-3xl'>{quiz.title}</h2>
                  <ScoreBadge quizId={quiz.id} />
                </div>
              </Link>
            )}
            {user && user.id === quiz.userId && (
              <div className='absolute top-1 right-1'>
                <Link href={`/edit/${quiz.slug}`}>
                  <button className='btn btn-ghost btn-sm btn-circle'>
                    <Pencil size={16} />
                  </button>
                </Link>
                <button
                  onClick={() => handleConfirmModal(quiz.id)}
                  className='btn btn-ghost btn-sm btn-circle'
                >
                  <Trash2 color='red' size={16} />
                </button>
              </div>
            )}
          </div>
        );
      })}

      <dialog id='deleteQuiz' className='modal modal-middle sm:modal-middle'>
        <div className='modal-box flex flex-col items-center gap-2'>
          <p>Are you sure you want to delete this quiz? </p>
          <div className='modal-action justify-center'>
            <button className='btn btn-error' onClick={handleDelete}>
              Confirm
            </button>
            <button
              className='btn'
              onClick={() => document.getElementById("deleteQuiz").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
