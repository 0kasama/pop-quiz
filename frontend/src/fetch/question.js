const { BASE_URL } = require("@/utils/baseUrl");
import Cookies from "js-cookie";

export const findAllQuestions = async (params) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  const { quizId } = params;
  try {
    const response = await fetch(`${BASE_URL}/question?quizId=${quizId}`, {
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

export const findQuestion = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/question/${id}`, {
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

export const createQuestion = async (questionData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/question`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateQuestion = async (id, questionData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/question/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const destroyQuestion = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/question/${id}`, {
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
