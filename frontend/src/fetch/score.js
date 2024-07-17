const { BASE_URL } = require("@/utils/baseUrl");
import Cookies from "js-cookie";

export const findAllScores = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/score`, {
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

export const findScore = async (slug) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/score/${slug}`, {
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

export const createScore = async (scoreData) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/score`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const destroyScore = async (id) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${BASE_URL}/score/${id}`, {
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
