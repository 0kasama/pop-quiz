"use client";

import { useEffect, useState } from "react";
import { findAllScores } from "@/fetch/score";

export default function ScoreBadge({ quizId }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
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

    fetchScores();
  }, []);

  const score = scores.find((s) => s.quizId === quizId);

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      {score ? (
        <div className='badge badge-success'>Score: {score.score}</div>
      ) : (
        <div className='badge badge-warning'>Not Taken Yet</div>
      )}
    </div>
  );
}
