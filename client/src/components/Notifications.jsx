import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { IoNotifications } from 'react-icons/io5';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/notifications/all')
            .then(response => {
                if (response.data && response.data.success && Array.isArray(response.data.data.notifications)) {
                    const notifications = response.data.data.notifications.map(notification => ({
                        ...notification,
                        seen: false
                    }));
                    setNotifications(notifications);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    const handleNotificationClick = (index) => {
        setNotifications(prevNotifications =>
            prevNotifications.map((notification, i) =>
                i === index ? { ...notification, seen: true } : notification
            )
        );
        setUnseenCount(prevCount => prevCount - 1);
    };

    const handleAllRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({ ...notification, seen: true }))
        );
    };

    return (
        <Sheet>
            <SheetTrigger>
                <Button className='relative'>
                    <IoNotifications className="text-xl text-yellow-400" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className='w-full py-5 flex flex-col items-center justify-center'>
                    <div className='flex w-full items-center justify-between'>
                        <SheetTitle>Notifications</SheetTitle>
                        <SheetTitle className='cursor-pointer text-xs' onClick={handleAllRead}>All Read</SheetTitle>
                    </div>
                    <SheetDescription>
                        Here are your recent notifications.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <div className="space-y-4 text-left">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <Alert
                                    key={index}
                                    className={`cursor-pointer ${notification.seen ? '' : 'bg-black text-white'}`}
                                    onClick={() => handleNotificationClick(index)}
                                >
                                    <AlertTitle>{notification.body}</AlertTitle>
                                    <AlertDescription>
                                        Received on {new Date(notification.createdAt).toLocaleString()}
                                    </AlertDescription>
                                </Alert>
                            ))
                        ) : (
                            <Alert>
                                <AlertTitle>No notifications</AlertTitle>
                                <AlertDescription>
                                    You currently have no notifications.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default Notifications;
