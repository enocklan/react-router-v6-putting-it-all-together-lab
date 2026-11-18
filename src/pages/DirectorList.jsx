
import { Link, useOutletContext } from "react-router-dom";

const DirectorList = () => {
  const { directors } = useOutletContext();

  return (
    <div>
      <h2>Directors</h2>

      <Link to="/directors/new">Add New Director</Link>

      <ul>
        {directors.map((director) => (
          <li key={director.id}>
            <Link to={`/directors/${director.id}`}>
              {director.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectorList;
