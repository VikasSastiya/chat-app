'use client'

import React, { useState } from 'react'
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
// import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SafeUser = Omit<User, "name" | "email" | "image"> & {
  name: string | null
  email: string | null
  image: string | null
}

interface SettingsModalProps {
  isOpen?: boolean
  onClose: () => void
  currentUser: SafeUser | null
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string
  }
}

export default function SettingsModal({ isOpen, onClose, currentUser }: SettingsModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || '',
      image: currentUser?.image || '',
    }
  })

  const image = watch('image')

  const handleUpload = (result: CloudinaryUploadResult) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
  
    axios.post('/api/settings/', data)
      .then(() => {
        router.refresh()
        window.location.reload()
        onClose()
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-600">
            Make changes to your profile here. Click save when you’re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage
                        src={image || currentUser?.image || "/placeholder.svg?height=96&width=96"}
                        alt="Profile"
                        width={96}
                        height={96}
                    />
                    <AvatarFallback>{currentUser?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              <CldUploadButton 
                options={{ maxFiles: 1 }} 
                onSuccess={(result) => handleUpload(result as CloudinaryUploadResult)}
                uploadPreset="ymwmaq0t"
              >
                <Button 
                  variant="outline" 
                  type="button" 
                  disabled={isLoading}
                  className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                >
                  Change Avatar
                </Button>
              </CldUploadButton>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder='Change your username to...'
                disabled={isLoading}
                className="bg-white border-gray-300 text-gray-900 focus:ring-gray-400 focus:border-gray-400"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-200"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}