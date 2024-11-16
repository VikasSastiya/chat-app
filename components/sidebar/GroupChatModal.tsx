'use client'

import React, { useState } from 'react'
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import Modal from "@/components/Modal"
import Input from "@/components/Inputs/Input"
import Select from '@/components/Inputs/Select'
import { Button } from '@/components/ui/button'
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Users } from 'lucide-react'

interface GroupChatModalProps {
  isOpen?: boolean
  onClose: () => void
  users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, users, onClose }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const members = watch("members")

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post("/api/conversations", {
      ...data,
      isGroup: true
    })
      .then(() => {
        toast.success("Group chat created successfully!")
        router.refresh()
        onClose()
      })
      .catch(() => {
        toast.error("Failed to create group chat!")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create a Group Chat</h2>
          <p className="mt-1 text-sm text-gray-600">
            Connect with multiple people in a single conversation
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Group Name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">Members</label>
              {/* <ScrollArea className="h-[100px] border rounded-md mt-1 p-2"> */}
                <Select
                  disabled={isLoading}
                  label=""
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name || "Unnamed User"
                  }))}
                  onChange={(value) => setValue("members", value, { shouldValidate: true })}
                  value={members}
                />
              {/* </ScrollArea> */}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <p>Select more than 2 members to create a group</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || members.length < 2}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default GroupChatModal