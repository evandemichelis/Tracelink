import React, { createContext, useContext, useState } from 'react'

export interface UserType {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  status: string
}

interface UserContextType {
  user: UserType
  setUser: (user: UserType) => void
}

const defaultUser: UserType = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  status: ''
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {}
})

export const useUserContext = () => useContext(UserContext)

export const UserProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<UserType>(defaultUser)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
