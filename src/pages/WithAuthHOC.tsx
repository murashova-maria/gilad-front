import { Navigate, useLocation } from "react-router-dom";
import { useUserState } from "../store/user/hooks";

const WithAuthHOC = ({children}: {children: React.ReactNode}) => {
  const {isLogin} = useUserState()
  const {pathname} = useLocation()

  if (isLogin && pathname === '/sign-in') return <Navigate to='/' />
  if (!isLogin && pathname !== '/sign-in') return <Navigate to='/sign-in' />

  return (
    <>{children}</>
  )
};

export default WithAuthHOC;
