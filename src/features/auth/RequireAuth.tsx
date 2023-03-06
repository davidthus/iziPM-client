import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import useAuth, { userRoles } from "../../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: (userRoles.member
  | userRoles.projectManager
  | userRoles.owner)[];
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
    const location = useLocation()
    const status = useAuth()

    if(status === false) return <Navigate to="/dash" state={{ from: location }} replace />;

    const content = (
        allowedRoles.some(role => role <= status)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth