import { useContext } from 'react';
import { Route, useNavigate } from 'react-router-dom';

import AuthContext from 'contexts/Auth';

export default function ProtectedRoute({
  path,
  element: Component,
  ...restProps
}: any) {
  const navigate = useNavigate();

  const { user }: any = useContext(AuthContext);

  if (!user) navigate('/');

  return <Route {...restProps} path={path} element={<Component />} />;
}
