import { Navigate, useLocation } from "react-router-dom";
import { useUserState } from "../store/user/hooks";

const WithAuthHOC = ({children}: {children: React.ReactNode}) => {
  const {token} = useUserState()
  const {pathname} = useLocation()

  if (token && pathname === '/sign-in') return <Navigate to='/' />
  if (!token && pathname !== '/sign-in') return <Navigate to='/sign-in' />

  return (
    <>{children}</>
  )
};

export default WithAuthHOC;
