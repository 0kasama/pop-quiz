const { BASE_URL } = require("@/utils/baseUrl");
import Cookies from "js-cookie";

export const findAllQuizzes = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/quiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findQuiz = async (slug) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/quiz/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createQuiz = async (quizData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/quiz`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateQuiz = async (slug, quizData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/quiz/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const destroyQuiz = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/quiz/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
