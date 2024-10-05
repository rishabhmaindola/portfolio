import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

function BlogDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/blogs/blog/${id}`)
            .then(response => {
                const postData = response.data.post;
                setPost(postData)
            })
            .catch(error => {
                console.error('Error fetching post:', error)
            });
    }, [id]);

    if (!post) {
        return (
            <div className="flex  w-100% h-full m-5 items-center justify-center ">
                <Skeleton className=" flex items-center justify-center h-screen w-1/2 m-5 rounded-xl" />
            </div>
        )
    }

    const paragraphs = post.body.split('\n\n');

    return (
        <div className='flex flex-col w-full h-full gap-3 bg-[#F5F5F5] p-5 items-center justify-center'>
            <div className='flex flex-col w-1/2 items-center jutify-center gap-3 bg-white' >
                <h3>{post.title}</h3>
                <p className='font-semibold'>{post.createdAt.slice(0, 10)}</p>
                <div className='flex gap-2 mt-4'>
                    {post.tags.map((tag, index) => (
                        <Badge key={index}>
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className='p-5 text-left'>
                    <div>
                        <Carousel >
                            <CarouselContent >
                                {post.images.map((image, index) => (
                                    <CarouselItem key={index} className='flex items-center justify-center'>
                                        <img src={image} key={index} alt={`Post Image ${index + 1}`} width="300" height="150" />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className='font-bold bg-black text-white' />
                            <CarouselNext className='font-bold bg-black text-white' />
                        </Carousel>
                    </div>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className='text-lg font-semibold mt-4'>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;