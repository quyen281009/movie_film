import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Trending from "./components/Trending";
import { fetchMovies, fetchTrending } from "./services/tmdb";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useDebounce(() => setDebounced(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    fetchMovies(debounced).then((res) => {
      setMovies(res || []);
      setLoading(false);
    });
  }, [debounced]);

  useEffect(() => {
    fetchTrending().then(setTrending);
  }, []);

  return (
    <main className="pt-24">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="pattern" />
      <div className="wrapper">
        {/* TRENDING */}
        {trending.length > 0 && <Trending movies={trending} />}

        {/* ALL MOVIES */}
        <section className="all-movies">
          <h2>All Movies</h2>
          {loading ? (
            <Spinner />
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
