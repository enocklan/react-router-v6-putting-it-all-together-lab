
import { useState } from "react";
import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

function DirectorForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const { setDirectors } = useOutletContext();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDirector = {
      name,
      bio,
      movies: [],
    };

    fetch("http://localhost:4000/directors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDirector),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add director");
        }
        return response.json();
      })
      .then((data) => {
        setDirectors((currentDirectors) => [
          ...currentDirectors,
          data,
        ]);

        navigate(`/directors/${data.id}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Add New Director</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <textarea
          placeholder="Director's Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          required
        />

        <button type="submit">Add Director</button>
      </form>
    </div>
  );
}

export default DirectorForm;
