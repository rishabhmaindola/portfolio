import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Badge } from './ui/badge';
import { MdOutlineLiveTv } from "react-icons/md";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/projects/all')
            .then(response => {
                setProjects(response.data.projects);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(true);
            });
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-screen bg-matte-black text-white p-5'>
                <h2>Projects</h2>
                <div className='flex h-full w-full flex-wrap gap-5 mb-10'>
                    <Skeleton className="h-full w-full m-5 flex items-center justify-center">Loading Projects...</Skeleton>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center h-full p-10 bg-matte-black text-white'>
            <h2 >Projects</h2>
            <div className='flex flex-wrap w-full h-full items-center justify-center'>
                {projects.map((project) => (
                    <Drawer key={project.id} >
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col w-1/2 gap-5 p-5 items-center justify-center '>
                            <Carousel >
                                <CarouselContent style={{ width: '600px', height: '300px' }}>
                                    {project.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img key={index} src={image} className='w-full h-full object-cover' />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className='text-black font-bold bg-opacity-40' />
                                <CarouselNext className='text-black font-bold bg-opacity-40' />
                            </Carousel>
                            <DrawerTitle>{project.title}</DrawerTitle>
                            <DrawerTrigger className='p-3 w-1/2'>
                                <Button>Read More</Button>
                            </DrawerTrigger>
                        </motion.div>
                        <DrawerContent className='flex flex-col bg-matte-black h-full items-center justify-center text-white'>
                            <DrawerHeader className='flex flex-col items-center  w-60% h-full gap-5  px-10 '>
                                <DrawerTitle className='text-2xl'>{project.title}</DrawerTitle>
                                <DrawerDescription className='text-white'>{project.description}</DrawerDescription>
                                {project.images.map((image, index) => (
                                    <DrawerDescription key={index}>{index + 1}{' '}.{' '}<a href={image} target='_blank' noreferrer noopenner>{image}</a></DrawerDescription>
                                ))}
                            </DrawerHeader>
                            <div className='flex flex-col items-center justify-between w-full '>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='flex w-full p-3 gap-5 items-center justify-center'>
                                    {project.languages.map((lang, index) => (
                                        <Badge key={index} className='px-5 py-2.5 bg-white text-black cursor-pointer hover:text-white'>
                                            {lang}
                                        </Badge>
                                    ))}
                                </motion.div>
                                <div className='flex items-center justify-center w-1/2 p-5 gap-5'>
                                    <motion.span
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className='flex gap-2 items-center '>
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" className='flex w-8 h-8 rounded-full items-center justify-center bg-white ' />
                                        <a href={project.coderepo} target="_blank">Github Repo</a>
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, x: 15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className='flex gap-2 items-center '>
                                        <MdOutlineLiveTv className='w-8 h-8' />
                                        <a href={project.livedemo} target='_blank' >View Live</a>
                                    </motion.span>
                                </div>
                            </div>
                            <DrawerFooter className='flex flex-col w-1/2 items-center justify-center mb-5'>
                                <DrawerClose asChild className='w-1/3 text-black'>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                ))}
            </div>
        </div>
    )
}

export default Projects