"use client";

import QuizCard from "@/components/QuizCard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    router.push("/login");
  }

  return (
    <div className='mt-10'>
      <QuizCard />
    </div>
  );
}
