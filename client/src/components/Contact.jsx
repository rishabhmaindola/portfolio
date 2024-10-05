import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from '@/components/ui/textarea'
import { MdEmail } from 'react-icons/md'
import { FaPhoneVolume } from 'react-icons/fa6'
import { FaLocationDot } from 'react-icons/fa6'
import axios from 'axios'

function Contact() {
    const { toast } = useToast()

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [otp, setOtp] = useState('');

    const sendOtp = async () => {
        if (form.name && form.email) {
            const email = form.email;
            try {
                const response = await axios.post('http://localhost:5000/api/v1/otp/generate', { email });
                console.log(response.data);
                if (response.status === 200) {
                    setIsDialogOpen(true);
                    toast({
                        description: "OTP sent to your email",
                    });
                }
            } catch (err) {
                console.error('Error Sending OTP', err);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error sending OTP. Please try again.",
                    action: (
                        <ToastAction altText="Retry" onClick={sendOtp}>Retry</ToastAction>
                    ),
                });
            }
        } else {
            toast({
                variant: "destructive",
                description: "Please fill in all required details.",
            });
        }
    };

    const submit = async () => {
        const data = {
            otp: otp,
            email: form.email,
            form: form,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/v1/otp/verify', data);
            console.log(response.data);
            if (response.data.success) {
                setForm({ name: '', email: '', message: '' });
                setOtp('');
                setIsDialogOpen(false);
                toast({
                    description: "Form Submitted Successfully",
                });
            } else if (response.status === 208) {
                console.error('Error:', response.data.message);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Incorrect OTP. Please try again.",
                    action: (
                        <ToastAction altText="Retry" onClick={sendOtp}>Retry</ToastAction>
                    ),
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error sending OTP. Please try again.",
                action: (
                    <ToastAction altText="Retry" onClick={sendOtp}>Retry</ToastAction>
                ),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }


    return (
        <div className='flex flex-col items-center justify-center h-screen bg-matte-black bg-transparent text-white'>
            <span>
                <h2>Get In Touch</h2>
            </span>

            <div className='flex items-center justify-center gap-20 p-10 w-full'>
                <div className='flex flex-col items-start m-10'>
                    <motion.h2
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.8, delay: 0.2 }}
                        className='text-gradient from-purple-500 to-yellow-500 font-montserrat'
                    >
                        Let's Talk
                    </motion.h2>
                    <p className='text-left leading-loose'>
                        I'm currently available to take on the new projects, so feel free to send <br />
                        me a message about anything that you want to work on. You can <br />
                        contact me anytime.
                    </p>
                    <span className='flex flex-col items-start py-5'>
                        <p className='flex items-center justify-center gap-5 py-2'><MdEmail className='text-3xl' /> rishabhmaindola5@gmail.com</p>
                        <p className='flex items-center justify-center gap-5 py-2'><FaPhoneVolume className='text-2xl' />+91 96505-58215</p>
                        <p className='flex items-center justify-center gap-5 py-4'><FaLocationDot className='text-3xl' />Uttar Pradesh,India</p>
                    </span>
                </div>
                <motion.Card
                    initial={{}}
                    className='flex flex-col bg-white w-1/4 p-5 m-10 shadow-md text-black shadow-white'
                >
                    <CardContent className="flex flex-col p-5 gap-5 ">
                        <div className='flex flex-col gap-2 items-start justify-start'>
                            <Label htmlFor='name' className="flex gap-1">Name <strong className='text-red-500'>*</strong></Label>
                            <Input type="text" name='name' value={form.name} placeholder="Name" className="text-white bg-matte-black p-5" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-2 items-start justify-start'>
                            <Label htmlFor='email' className="flex gap-1">Email <strong className='text-red-500'>*</strong></Label>
                            <Input type='email' name='email' value={form.email} placeholder="Email" className="text-white bg-matte-black p-5" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-2 items-start justify-start'>
                            <Label htmlFor='message' className="flex gap-1">Message</Label>
                            <Textarea name='message' value={form.message} placeholder="Type your message here." id="message" className="text-white bg-matte-black h-[150px] p-5" onChange={handleChange} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={sendOtp} >Submit</Button>
                    </CardFooter>
                </motion.Card>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogContent className='flex w-full flex-col items-center justify-center gap-5'>
                    <DialogHeader className='grid place-content-center place-items-center'>
                        <DialogTitle>Verify Your Email </DialogTitle>
                        <DialogDescription>Enter the 6-digit otp sent to your email</DialogDescription>
                    </DialogHeader>
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} >
                        <InputOTPGroup className='text-black'>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <DialogFooter className='flex flex-row w-full  p-3 '>
                        <div className='flex gap-10 items-center '>
                            <DialogDescription>00:30</DialogDescription>
                            <Button onClick={sendOtp} disabled >Resend</Button>
                        </div>
                        <Button onClick={submit}  >Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Contact