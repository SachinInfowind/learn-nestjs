import { ToastContainer } from 'react-toastify'
import ApplicationRoutes from  './Routes/Route'
import { User } from './interfaces/interface'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getUser } from './utils/common/commonFunctions'
import { createContext } from 'react'
interface MyContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

// Initialize the context with undefined to ensure type safety
export const MyContext = createContext<MyContextType | null>(null);
function App() {
  const [user, setUser] = useState<User | null>(null)

  console.log('re-render')
  useEffect(() =>{
    try {
      const user = getUser();
      console.log(user ?  true : false)
        setUser(user)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
   }, [])
  return (
    <>
    <MyContext.Provider value={{user, setUser}}>
    <ToastContainer />
     <ApplicationRoutes/>
     </MyContext.Provider>
    </>
  )
}

export default App
