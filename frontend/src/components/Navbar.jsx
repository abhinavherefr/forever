import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login ')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img className='w-36' src={assets.logo} alt="" /></Link>

        <ul className="hidden flex gap-5 text-sm sm:flex text-gray-700">

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT US</p>
                <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
            </NavLink>

        </ul>

        <div className="flex items-center gap-6">
            <Link to={'/collection'}><img src={assets.search_icon} onClick={() => { setShowSearch(true) }} className='w-5 cursor-pointer' alt="" /></Link>

            <div className="group relative">
                <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                {/* Dropdown menu */}

                {
                    token &&
                    <div className="absolute group-hover:block dropdown-menu hidden rounded right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500">
                        <p className="cursor-pointer hover:text-black">Profile</p> 
                        <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                        <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                </div>
                }
                

            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                <p className='rounded-full bg-black text-white text-center text-[8px] absolute right-[-5px] bottom-[-5px] leading-4 w-4 aspect-square'>{getCartCount()}</p>
            </Link>
            <img onClick={() => { setVisible(true) }}  src={assets.menu_icon} className='sm:hidden w-5 cursor-pointer' alt="" />

        </div>


        {/* Sidebar menu for small devices */}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${visible ? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div onClick={() => { setVisible(false) }} className="flex items-center gap-2 text-sm p-3 cursor-pointer">
                    <img src={assets.dropdown_icon} className='rotate-180 h-4' alt="" />
                    {/* <p className='text-gray-400'>Back</p> */}
                </div>
                <NavLink onClick={() => { setVisible(false) }} className='py-3 pl-6' to='/'>HOME</NavLink>
                <NavLink onClick={() => { setVisible(false) }} className='py-3 pl-6' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={() => { setVisible(false) }} className='py-3 pl-6' to='/about'>ABOUT</NavLink>
                <NavLink onClick={() => { setVisible(false) }} className='py-3 pl-6' to='/contact'>CONTACT</NavLink>
            </div>


        </div>


    </div>
    )
}

export default Navbar