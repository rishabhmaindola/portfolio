import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from './ui/label';

function LatestBlogs({ title, tags, id, image, likes, time }) {

    function getDate(string) {
        return string.slice(0, 10);
    }

    return (
        <Card key={id} className='w-80 h-full flex flex-col justify-between p-4'>
            <CardHeader className='flex flex-col text-left gap-2'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CardTitle className='font-baskervville truncate cursor-pointer'>{title}</CardTitle>
                        </TooltipTrigger>
                        <TooltipContent>
                            {title}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <CardDescription>
                    <Label>{getDate(time)}</Label>
                </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
                <img src={image} alt='blog images for' className='w-full h-40 object-cover' />
            </CardContent>
            <CardFooter className='flex flex-col gap-5 items-start'>
                <Link to={`/blog/${id}`}>
                    <Button>Read More</Button>
                </Link>
                <div className='flex flex-wrap gap-2'>
                    {tags.map((tag, index) => (
                        <Badge key={index}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}

export default LatestBlogs;
