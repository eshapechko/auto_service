const API_URL = 'https://gelatinous-meadow-shrimp.glitch.me/api';

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Ошибка при получении данных: ${error}`);
  }
};
