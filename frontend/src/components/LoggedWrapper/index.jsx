import PropTypes from "prop-types";
import { useUserSelectors } from "../../hooks/useUserActions";
import { Navigate } from "react-router-dom";

const LoggedWrapper = ({ path, element }) => {
    const { isLoggedIn } = useUserSelectors();

    const isAuthRoute = ["/login", "/register"].includes(path);

    if (!isLoggedIn && !isAuthRoute) {
        //return <Navigate to="/login" replace />;
        return <>{element}</>;
    }

    if (!isLoggedIn && isAuthRoute) {
        return (
            <>
                {element}
            </>
        );
    }

    return <>{element}</>;
};

LoggedWrapper.propTypes = {
    path: PropTypes.string.isRequired,
    element: PropTypes.node.isRequired,
};

export default LoggedWrapper;