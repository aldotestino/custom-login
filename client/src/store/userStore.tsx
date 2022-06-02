import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {URI} from "../vars";
import {useNavigate} from "react-router-dom";

interface UserI {
  firstName: string
  lastName: string
  id: string
  email: string
}

interface UserContextI {
  user: UserI | null
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>
  logout: () => void
  isAuth: boolean
}

const UserContext = createContext<UserContextI>({} as UserContextI);

interface UserProviderProps {
  children: ReactNode
}

function useAuth() {
  return useContext(UserContext);
}

async function getUserInfo(): Promise<UserI | null> {
  const res = await fetch(`${URI}/me`, {
    method: 'GET',
    credentials: 'include'
  }).then(r => r.json());

  if(!res.success) {
    return null;
  }

  return res.data.user;
}

function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<UserI | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then(user => setUser(user));
  }, []);

  const isAuth = useMemo(() => Boolean(user?.id && user.id !== ''), [user]);

  async function logout() {
    const res = await fetch(`${URI}/logout`, {
      method: 'GET',
      credentials: 'include'
    }).then(r => r.json());

    if (res.success) {
      setUser(null);
    }
  }

  const store = useMemo(() => ({user, setUser, logout, isAuth}), [user, setUser, isAuth]);

  return (
    <UserContext.Provider value={store} >
      {children}
    </UserContext.Provider>
  )
}

export {UserProvider, useAuth}


