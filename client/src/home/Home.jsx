import React from 'react'
import Skills from '@/components/Skills'
import Rishabh from '@/components/Rishabh'
import HomeBackground from '@/components/HomeBackground'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import HeroBackground from '@/components/HeroBackground'

function Home({ refs }) {

    return (

        <div className='flex flex-col w-full h-full bg-black'>
                    <Rishabh />
            {/* <div className='flex overflow-hidden relative'>
                <HeroBackground/>
                <div className='absolute top-0 bottom-0 left-0 right-0'>
                </div>
            </div> */}
            <div ref={refs.skillsRef} />
            <Skills />

            <div ref={refs.projectsRef} />
            <Projects />

            <div className='flex overflow-hidden relative'>
                <HomeBackground />
                <div className='absolute top-0 bottom-0 left-0 right-0'>
                    <Contact />
                </div>
            </div>

        </div>
    )
}

export default Home