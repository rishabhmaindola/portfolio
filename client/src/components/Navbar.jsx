import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import Notifications from './Notifications';
import Socials from './Socials';

function Navbar({ scrollToSection, refs }) {
    const location = useLocation();

    const blogPage = location.pathname.startsWith('/blog')

    return (
        <div className='flex items-center justify-between w-80% h-1/2 px-10 py-7  text-white  bg-matte-black '>
            <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-2xl font-baskervville cursor-pointer transition-ease  delay-300  text-gradient from-white to-white hover:from-purple-600 hover:to-yellow-500'>
                <strong>RISHABH</strong>
            </motion.p>
            <span className='flex items-center justify-center gap-5'>
                <motion.a
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 1 }}
                    href='/'
                    className='font-bold  text-gradient from-white to-white hover:from-purple-600 hover:to-purple-500 '>
                    Home
                </motion.a>
                {!blogPage && (
                    <motion.p
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1 }}
                        transition={{ duration: 1 }}
                        onClick={() => scrollToSection(refs.skillsRef)}
                        className='font-bold text-gradient from-white to-white hover:from-purple-600 hover:to-purple-500 cursor-pointer'>
                        Skills
                    </motion.p>
                )}
                {!blogPage && (
                    <motion.a
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1 }}
                        transition={{ duration: 1 }}
                        onClick={() => scrollToSection(refs.projectsRef)}
                        className='font-bold text-gradient from-white to-white hover:from-purple-600 hover:to-purple-500 cursor-pointer'>
                        Projects
                    </motion.a>
                )}
                {/* <motion.a
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 1 }}
                    href='/blog'
                    className='font-bold text-gradient from-white to-white hover:from-purple-600 hover:to-purple-500'>
                    Blog
                </motion.a> */}
            </span>
            {blogPage && (
                <motion.div
                    initial={{ rotate: [0, 0, 0, 0, 0, 0] }}
                    whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <Notifications />
                </motion.div>
            )}
            {!blogPage && (
                <Socials />
            )}
        </div>
    )
}

export default Navbar
