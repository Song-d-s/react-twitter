import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "firebaseInit";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  // 방법 3 - adding state for rerendering
  const [newName, setNewName] = useState("");
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
        /* // Method 2
        setUserObj(user); */
        /* // Method 1 
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        }); */
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setNewName(user.displayName);
    /* // Method 2 refreshUser = async () ...
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser); */
    /* // Method 1
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    }); */
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing"
      )}
    </>
  );
}

export default App;
