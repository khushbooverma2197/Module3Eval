const KEY = "evalData";

export const getRestaurants = () => {
  const stored = localStorage.getItem(KEY);
  const result = stored ? JSON.parse(stored) : [];
  return result;
};

export const saveRestaurants = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
