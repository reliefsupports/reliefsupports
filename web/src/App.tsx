import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React , { useEffect, useState } from 'react';
import { auth } from 'firebaseConfig/config';
import { useDispatch } from 'react-redux';
import Home from 'screens/Home';
import EntrySingle from 'screens/Entry';
import CreateEntry from 'screens/Entry/Create';
import SignIn from 'screens/Auth';
import Register from 'screens/Auth/Register';

function App() {
  const dispatch = useDispatch()

    const [logged, setLogged] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
          console.log(user)
            if (user) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        })

        if(logged) {
            // dispatch(getCurUserListen("udaraj08@gmail.com"))
        }
    }, [logged])

  const routerController = () => {
    if (logged) {
      return [
        <Route path="/" element={<Home />} />,
        <Route path="entries/create" element={<CreateEntry />} />,
        <Route path="entries/:id" element={<EntrySingle />} />,
        <Route path="*" element={<Navigate replace to="/" />} />
      ]
    } else {
      return [
        <Route path="sign-in" element={<SignIn />} />,
        <Route path="sign-in/register" element={<Register />} />,
        <Route path="/" element={<Navigate replace to="/sign-in" />} />
      ]
    }
  }

  return (
    <Router>
      <Routes>
        {routerController()}
      </Routes>
    </Router>
  );
}

export default App;
