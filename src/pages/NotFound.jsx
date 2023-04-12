import { useParams, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return <div>Page not found</div>;
};

export default NotFound;
