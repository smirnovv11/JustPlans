import Header from "../header"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import { Chip, Divider } from "@nextui-org/react"

const Layout = () => {
  const user = useSelector(selectUser)

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-full md:mx-0 md:w-10/12 items-center">
        {user ? <Header /> : <></>}
        <div className="w-full h-screen flex justify-center">
          <Outlet/>
        </div>
        <Divider className="lg:w-2/3 xl:w-1/2 w-full"/>
        <span className="m-2 text-gray-500 text-sm">Made by <span className="underline">smirnovv11</span> 2024</span>
      </div>
    </div>
  )
}

export default Layout
