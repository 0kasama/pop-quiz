const { BASE_URL } = require("@/utils/baseUrl");
import Cookies from "js-cookie";

export const findAllAnswers = async (params) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  const { questionId } = params;
  try {
    const response = await fetch(`${BASE_URL}/answer?questionId=${questionId}`, {
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

export const findAnswer = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/answer/${id}`, {
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

export const createAnswer = async (answerData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/answer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateAnswer = async (id, questionData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/answer/${id}`, {
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

export const destroyAnswer = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/answer/${id}`, {
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
