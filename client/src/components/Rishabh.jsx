import React from 'react'
import rishabh from '../assets/rishabh.png'
import Typewriter from 'typewriter-effect'
import { motion } from 'framer-motion'

function Rishabh() {

    return (
        <div className='bg-matte-black bg-opacity-20 text-white flex flex-col items-center justify-center h-full p-20 gap-10'>
            <div className='flex flex-col items-center justify-center gap-5'>
                <img
                    src={rishabh}
                    alt='rishabh'
                    className='block rounded-full cursor-pointer'
                    style={{ width: '240px', height: '250px' }} />
                <span className='flex w-full items-center gap-2 mr-20 pr-10'>
                    <h2 className='w-full text-right' >Hi, I am</h2>
                    <h2 className='text-gradient from-purple-600 to-yellow-500 w-full text-left '>
                        <Typewriter
                            options={{
                                strings: ['Full Stack Developer', 'Rishabh Maindola'],
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 50,
                                pauseFor: 2000,
                            }}
                        />
                    </h2>
                </span>
                <h2>based in India.</h2>
                <p className='leading-loose'> I specialize in building high-quality web applications with modern technologies. With a passion for coding <br />and a commitment to continuous learning, I aim to deliver exceptional digital experiences.</p>
            </div>
            <div className='flex flex-row sm:flex-col sm:gap-5 lg:flex-row lg:gap-0 items-center justify-between w-1/3'>
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)' }}
                    whileTap={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='w-1/2 text-nowrap mx-5 px-6 py-4 rounded-full bg-gradient from-purple-600 to-yellow-500'
                >
                    Connect With me
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(34,193,195,1), 0px 0px 25px rgba(253,187,45,1)' }}
                    whileTap={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='w-1/2 mx-5 px-6 py-4 rounded-full bg-transparent border-2 border-white'>
                    My Resume
                </motion.button>
            </div>
        </div>
    )
}

export default Rishabh