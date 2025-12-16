import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

Modal.setAppElement("#root");

export const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: { autoplay: 1 },
};

const MovieProvider = ({ children }) => {
  const [videoId, setVideoId] = useState(null);
  const [open, setOpen] = useState(false);

  const openTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      const trailer = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (trailer) {
        setVideoId(trailer.key);
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeTrailer = () => {
    setOpen(false);
    setVideoId(null);
  };

  return (
    <MovieContext.Provider value={{ openTrailer }}>
      {children}
      <Modal
        isOpen={open}
        onRequestClose={closeTrailer}
        shouldCloseOnOverlayClick
        overlayClassName="trailer-overlay"
        className="trailer-modal"
      >
        <button className="trailer-close" onClick={closeTrailer}>
          ✕
        </button>
        {videoId && <YouTube videoId={videoId} opts={opts} />}
      </Modal>
    </MovieContext.Provider>
  );
};

export default MovieProvider;
