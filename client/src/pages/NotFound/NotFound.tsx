import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h1>Nothing on this page!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};
