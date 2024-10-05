import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Post({ title,description, tags, id }) {


    return (
        <Card className='flex flex-col w-full gap-5 p-5 items-center justify-center'>
            <CardTitle>{title}</CardTitle>
            <CardDescription >{description}</CardDescription>
            <CardFooter className='flex w-full items-center justify-between'>
                <div className='flex flex-wrap gap-2'>
                    {tags.map((tag, index) => (
                        <Badge key={index} >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Link to={`/blog/${id}`}>
                    <Button>Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
