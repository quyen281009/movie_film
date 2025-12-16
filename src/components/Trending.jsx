import { useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";

const Trending = ({ movies }) => {
  const { openTrailer } = useContext(MovieContext);

  return (
    <section className="trending">
      <h2>Trending Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            onClick={() => openTrailer(movie.id)}
          >
            <p>{index + 1}</p>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Trending;
