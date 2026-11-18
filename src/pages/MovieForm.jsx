
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

function MovieForm() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [genres, setGenres] = useState("");

  const { id } = useParams();
  const { director, setDirectors } = useOutletContext();
  const navigate = useNavigate();

  if (!director) {
    return <h2>Director not found.</h2>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMovie = {
      id: uuidv4(),
      title,
      time: parseInt(time, 10),
      genres: genres.split(",").map((genre) => genre.trim()),
    };

    const updatedMovies = [...director.movies, newMovie];

    fetch(`http://localhost:4000/directors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movies: updatedMovies,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        return response.json();
      })
      .then((updatedDirector) => {
        setDirectors((currentDirectors) =>
          currentDirectors.map((currentDirector) =>
            currentDirector.id === id
              ? updatedDirector
              : currentDirector
          )
        );

        navigate(`/directors/${id}/movies/${newMovie.id}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Add New Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(event) => setGenres(event.target.value)}
          required
        />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
