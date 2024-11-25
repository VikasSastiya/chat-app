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

interface CloudinaryUploadWidgetResults {
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

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        if (result?.info?.secure_url) {
            setValue('image', result.info.secure_url, {
                shouldValidate: true
            });
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const updatedData: { name?: string; image?: string } = {};
        
        if (data.name && data.name !== currentUser?.name) {
            updatedData.name = data.name;
        }
        
        if (data.image && data.image !== currentUser?.image) {
            updatedData.image = data.image;
        }

        if (Object.keys(updatedData).length === 0) {
            setIsLoading(false);
            onClose();
            return;
        }

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
                className="flex items-center justify-center min-h-fit text-center sm:block"
            >
                <div className="inline-block w-full align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                    <div className="bg-white dark:bg-gray-900 p-4 sm:p-6">
                        <div className="w-full">
                            <motion.h3
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4"
                            >
                                Edit Profile
                            </motion.h3>
                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6"
                            >
                                Customize your profile to make it uniquely yours.
                            </motion.p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-5 sm:space-y-6">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-col items-center space-y-3"
                                    >
                                        <div className="relative w-20 h-20 sm:w-32 sm:h-32">
                                            <Avatar className="w-full h-full ring-2 sm:ring-4 ring-purple-400">
                                                <AvatarImage
                                                    src={image || currentUser?.image || "/placeholder.svg"}
                                                    alt="Profile"
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="text-xl sm:text-4xl bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                                                    {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <CldUploadButton
                                            options={{ maxFiles: 1 }}
                                            onSuccess={(result) => {
                                                if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                                                    handleUpload(result as CloudinaryUploadWidgetResults);
                                                }
                                            }}
                                            uploadPreset="ymwmaq0t"
                                        >
                                            <Button
                                                variant="outline"
                                                type="button"
                                                disabled={isLoading}
                                                className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-300 border border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
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
                                        <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Username
                                        </Label>
                                        <Input
                                            id="name"
                                            disabled={isLoading}
                                            errors={errors}
                                            register={register}
                                            placeholder="Enter your new username"
                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-900 h-9 sm:h-10"
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-5 sm:mt-6 flex justify-end space-x-2"
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 h-8 sm:h-10"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-all duration-300 h-8 sm:h-10"
                                    >
                                        Save changes
                                    </Button>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

export default SettingsModal;