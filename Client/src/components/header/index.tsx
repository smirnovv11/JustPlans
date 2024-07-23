import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Link from '../link'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import { Paths } from '../../../paths'
import Button from '../button'
import { useCreateNoteMutation } from '../../app/services/notes'
import { useCreateCategoryMutation } from '../../app/services/category'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createNote] = useCreateNoteMutation()
  const [createCategory] = useCreateCategoryMutation()

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate(Paths.auth)
  }

  const onCreateNote = async () => {
    try {

      let categoryId: string = localStorage.getItem("defaultCategoryId") || ""
      if (!categoryId) {
        const defaultCategoryId = await (await createCategory({ name: "Default"}).unwrap()).id
        localStorage.setItem("defaultCategoryId", defaultCategoryId)
        categoryId = defaultCategoryId
      }

      const note = await createNote({
        categoryId: categoryId,
        title: "New note",
        content: ""
      }).unwrap()
      if (note)
        navigate(`${Paths.notes}/${note.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar>
      <NavbarContent justify='center' className='w-full flex justify-between mx-5 md:mx-0'>
        <NavbarMenuToggle className='sm:hidden'/>
        <NavbarBrand>
          <RouterLink to={Paths.home} className='w-full flex sm:w-auto items-center ml-4 sm:ml-0 gap-1 text-center sm:text-left'>
            <img src='/img/cube.png' className='w-[24px] h-[24px]'/>
            <p className='font-bold text-xl'>JustPlans</p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='center' className='gap-2 hidden sm:flex'>
        <NavbarItem> 
          <Button radius='lg' className='py-1 px-4 text-md h-auto' color='primary' onClick={onCreateNote}>Create</Button>
        </NavbarItem>
        <NavbarItem> 
          <RouterLink to={Paths.home}>
            <Link isBlock color='foreground'>Notes</Link>
          </RouterLink>
        </NavbarItem>
        <NavbarItem> 
          <Link isBlock color='foreground' onClick={onLogout}>Logout</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='flex'>
        <NavbarMenuItem> 
            <Button radius='lg' className='py-1 px-4 text-2xl h-auto' color='primary' onClick={onCreateNote}>Create</Button>
          </NavbarMenuItem>
          <NavbarMenuItem> 
            <RouterLink to={Paths.home}>
              <Link isBlock className='text-2xl' color='foreground'>Notes</Link>
            </RouterLink>
          </NavbarMenuItem>
          <NavbarMenuItem> 
            <Link isBlock color='foreground' className='text-2xl' onClick={onLogout}>Logout</Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
