import React from 'react'

function Footer() {

    return (
        <div className='flex flex-col w-full h-[200px] gap-5 items-center justify-center bg-matte-black text-white'>
            <ul className='flex gap-5 '>
                <li className='underline'><a href='https://github.com/rishabhmaindola' target='_blank' rel='noreferrer noopener'>Github</a></li>
                <li className='underline'><a href='https://leetcode.com/u/rishabhmaindola5/' target='_blank' rel='noreferrer noopener'>Leetcode</a></li>
                <li className='underline'><a href='https://www.codechef.com/users/rishabh05112' target='_blank' rel='noreferrer noopener'>CodeChef</a></li>
                <li className='underline'><a href='/blog' target='_blank' rel='noreferrer noopener' >Blog</a></li>
            </ul>
            <p>Rishabh Maindola, 2024</p>
        </div>
    )
}

export default Footer