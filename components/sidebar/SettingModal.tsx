"use client"

import React, {useState} from 'react';
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import Input from '@/components/sidebar/Input';
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import { Button } from '@/components/ui/button';

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

const SettingsModal: React.FC<SettingsModalProps> = ( { isOpen, onClose, currentUser } ) => {
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
    
        axios.post('/api/settings/', data)
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
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className={"mt-2 text-base font-semibold leading-7 text-gray-900"}>
                            Profile
                        </h2>
                        <p className={"mt-1 text-sm leading-6 text-gray-600"}>
                            Edit your public information.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input 
                              disabled={isLoading} 
                              label={"Name"} 
                              id={"name"} 
                              errors={errors} 
                              required 
                              register={register} 
                            />
                            <div>
                                <label className={"block text-sm font-medium leading-6 text-gray-900"}>
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image 
                                        className={"rounded-full"} 
                                        width={"48"} 
                                        height={"48"} 
                                        src={image || currentUser?.image || "/profile-pic.jpg"}
                                        alt={"Avatar"} 
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "/profile-pic.jpg";
                                        }}
                                    />
                                    <CldUploadButton 
                                        options={{ maxFiles: 1 }} 
                                        onSuccess={(result) => {
                                            handleUpload(result as CloudinaryUploadResult);
                                        }}
                                        uploadPreset={"ymwmaq0t"}
                                    >
                                        <Button 
                                            disabled={isLoading} 
                                            secondary 
                                            type={"button"}
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button 
                          disabled={isLoading} 
                          secondary 
                          onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button 
                          disabled={isLoading} 
                          type={"submit"}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;