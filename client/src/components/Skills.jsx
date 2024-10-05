import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'
import { Badge } from './ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function Skills() {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)

    const dragRef = useRef()

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/skills/all')
            .then(response => {
                setSkills(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching skills:', error)
                setLoading(true);
            });
    }, []);

    const renderStars = (proficiency) => {
        const stars = []
        const fullStars = Math.floor(proficiency)
        const hasHalfStar = proficiency % 1 !== 0
        const totalStars = 5

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoIosStar key={`star-${i}`} className="text-2xl text-yellow-500" />)
        }

        if (hasHalfStar) {
            stars.push(<IoIosStarHalf key="half-star" className="text-2xl text-yellow-500" />)
        }

        const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<IoIosStarOutline key={`empty-star-${i}`} className="text-2xl text-yellow-500" />)
        }

        return stars
    };

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-screen bg-matte-black text-white p-5'>
                <h2>Skills</h2>
                <div className='flex h-full w-full flex-wrap gap-5 mb-10'>
                    <Skeleton className="h-full w-full m-5 flex items-center justify-center">Loading Skills...</Skeleton>
                </div>
            </div>
        );
    }


    return (
        <div ref={dragRef} className='flex flex-col items-center justify-center w-100% h-full  bg-matte-black text-white '>
            <h2 >Skills</h2>

            <div className='flex flex-wrap items-center justify-center gap-3 my-5'>
                {skills
                    .filter(skill => skill.type === 'Databases')
                    .map((skill, index) => (
                        <Dialog key={index}>
                            <motion.div
                                drag
                                dragConstraints={dragRef}
                                dragSnapToOrigin={true}
                                initial={{ opacity: 0, y: -15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className='bg-transparent '
                            >
                                <DialogTrigger>
                                    <Badge className="flex flex-col m-1 p-7 gap-2 bg-white text-black text-lg cursor-pointer hover:text-white hover:border-1 hover:border-white">
                                        <img src={skill.iconUrl} className='h-10 w-10' />
                                        <p className='text-sm'>{skill.skill}</p>
                                    </Badge>
                                </DialogTrigger>
                            </motion.div>
                            <DialogContent className='flex flex-col items-center justify-center m-5'>
                                <h4 className='font-bold'>{skill.type}</h4>
                                <p className='flex'>{renderStars(skill.proficiency)}</p>
                                <DialogFooter>
                                    <DialogClose>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
            </div>

            <div className='flex flex-wrap items-center justify-center gap-3 my-5'>
                {skills
                    .filter(skill => skill.type === 'Programming Language')
                    .map((skill, index) => (
                        <Dialog key={index}>
                            <motion.div
                                drag
                                dragConstraints={dragRef}
                                dragSnapToOrigin={true}
                                initial={{ opacity: 0, y: -15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className='bg-transparent '
                            >
                                <DialogTrigger>
                                    <Badge className="flex flex-col m-1 p-7 gap-2 bg-white text-black text-lg cursor-pointer hover:text-white hover:border-1 hover:border-white">
                                        <img src={skill.iconUrl} className='h-10 w-10' />
                                        <p className='text-sm'>{skill.skill}</p>
                                    </Badge>
                                </DialogTrigger>
                            </motion.div>
                            <DialogContent className='flex flex-col items-center justify-center m-5'>
                                <h4 className='font-bold'>{skill.type}</h4>
                                <p className='flex'>{renderStars(skill.proficiency)}</p>
                                <DialogFooter>
                                    <DialogClose>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
            </div>

            <div className='flex flex-wrap items-center justify-center gap-3 my-5'>
                {skills
                    .filter(skill => skill.type === 'Tools/Platforms')
                    .map((skill, index) => (
                        <Dialog key={index}>
                            <motion.div
                                drag
                                dragConstraints={dragRef}
                                dragSnapToOrigin={true}
                                initial={{ opacity: 0, y: -15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className='bg-transparent '
                            >
                                <DialogTrigger>
                                    <Badge className="flex flex-col m-1 p-7 gap-2 bg-white text-black text-lg cursor-pointer hover:text-white hover:border-1 hover:border-white">
                                        <img src={skill.iconUrl} className='h-10 w-10' />
                                        <p className='text-sm'>{skill.skill}</p>
                                    </Badge>
                                </DialogTrigger>
                            </motion.div>
                            <DialogContent className='flex flex-col items-center justify-center m-5'>
                                <h4 className='font-bold'>{skill.type}</h4>
                                <p className='flex'>{renderStars(skill.proficiency)}</p>
                                <DialogFooter>
                                    <DialogClose>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
            </div>

            <div className='flex flex-wrap items-center justify-center gap-3 my-5'>
                {skills
                    .filter(skill => skill.type === 'Library/Frameworks')
                    .map((skill, index) => (
                        <Dialog key={index}>
                            <motion.div
                                drag
                                dragConstraints={dragRef}
                                dragSnapToOrigin={true}
                                initial={{ opacity: 0, y: -15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className='bg-transparent '
                            >
                                <DialogTrigger>
                                    <Badge className="flex flex-col m-1 p-7 gap-2 bg-white text-black text-lg cursor-pointer hover:text-white hover:border-1 hover:border-white">
                                        <img src={skill.iconUrl} className='h-10 w-10' />
                                        <p className='text-sm'>{skill.skill}</p>
                                    </Badge>
                                </DialogTrigger>
                            </motion.div>
                            <DialogContent className='flex flex-col items-center justify-center m-5'>
                                <h4 className='font-bold'>{skill.type}</h4>
                                <p className='flex'>{renderStars(skill.proficiency)}</p>
                                <DialogFooter>
                                    <DialogClose>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
            </div>

        </div>
    );
}

export default Skills;
