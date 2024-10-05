import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SiLeetcode } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

function Socials() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-nowrap mx-5 px-5 py-3 rounded-full bg-gradient-to-r from-black to-black hover:from-yellow-500 hover:to-purple-600 border-2 hover:border-white'>Connect With Me</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2'>
                    <a href='https://leetcode.com/u/rishabhmaindola5/' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
                        <SiLeetcode color='orange' className='text-lg' />
                        <p className='font-semibold text-yellow-400'>LeetCode</p>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2'>
                    <a href='https://github.com/rishabhmaindola' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
                        <FaGithub className='text-lg' />
                        <p className='font-semibold'>GitHub</p>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2'>
                    <a href='https://www.codechef.com/users/rishabh05112' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
                        <SiCodechef color='brown' className='text-lg' />
                        <p className='font-semibold text-amber-800'>CodeChef</p>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2'>
                    <a href='https://www.linkedin.com/in/rishabhmaindola' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
                        <BsLinkedin color='blue' className='text-lg' />
                        <p className='font-semibold text-blue-500'>LinkedIn</p>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Socials;
