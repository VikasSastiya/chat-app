"use client"

import React, { useState } from 'react';
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import Input from '@/components/Inputs/Input';
import { CldUploadButton } from "next-cloudinary";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

type SafeUser = Omit<User, "name" | "email" | "image"> & {
    name: string | null;
    email: string | null;
    image: string | null;
}

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: SafeUser | null;
}

interface CloudinaryUploadResult {
    info: {
        secure_url: string;
    };
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name || '',
            image: currentUser?.image || '',
        }
    });

    const image = watch('image');

    const handleUpload = (result: CloudinaryUploadResult) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const updatedData = {
            image: data.image,
            ...(data.name !== currentUser?.name && { name: data.name })
        };

        axios.post('/api/settings/', updatedData)
            .then(() => {
                router.refresh();
                window.location.reload();
                onClose();
            })
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center min-h-fit px-4 text-center sm:block sm:p-0"
            >
                <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <motion.h3
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl leading-6 font-semibold text-gray-900 mb-4"
                                >
                                    Edit Profile
                                </motion.h3>
                                <motion.p
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm text-gray-500 mb-6"
                                >
                                    Customize your profile to make it uniquely yours.
                                </motion.p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="space-y-8">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-col items-center space-y-4"
                                        >
                                            <div className="relative w-32 h-32">
                                                <Avatar className="w-full h-full ring-4 ring-purple-400 shadow-lg">
                                                    <AvatarImage
                                                        src={image || currentUser?.image || "/placeholder.svg?height=128&width=128"}
                                                        alt="Profile"
                                                        className="object-cover"
                                                    />
                                                    <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                                                        {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <CldUploadButton
                                                options={{ maxFiles: 1 }}
                                                onSuccess={(result) => {
                                                    handleUpload(result as CloudinaryUploadResult);
                                                }}
                                                uploadPreset="ymwmaq0t"
                                            >
                                                <Button
                                                    variant="outline"
                                                    type="button"
                                                    disabled={isLoading}
                                                    className="bg-white bg-opacity-50 text-purple-600 border border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                                >
                                                    Change Avatar
                                                </Button>
                                            </CldUploadButton>
                                        </motion.div>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="space-y-2"
                                        >
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Username</Label>
                                            <Input
                                                id="name"
                                                disabled={isLoading}
                                                errors={errors}
                                                register={register}
                                                placeholder="Enter your new username"
                                                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm"
                                            />
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-8 flex justify-end space-x-3"
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                            disabled={isLoading}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white bg-opacity-50 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Save changes
                                        </Button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

export default SettingsModal;