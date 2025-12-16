const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Lấy phim theo search hoặc top phổ biến
export const fetchMovies = async (query = "") => {
  const url = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(url, OPTIONS);
  const data = await res.json();
  return data.results || [];
};

// Lấy trending phim
export const fetchTrending = async () => {
  const url = `${API_BASE_URL}/trending/movie/week`;
  const res = await fetch(url, OPTIONS);
  const data = await res.json();
  return data.results?.slice(0, 5) || [];
};
