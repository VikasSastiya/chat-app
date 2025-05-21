"use client";

import React from "react";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/components/conversations/MessageInput";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/Slices/message";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/types";
const Form = () => {
  const dispatch = useDispatch();
  const { conversationId } = useConversation();
  const session = useSession();
  console.log(session?.data?.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!session?.data?.user?.id) return;
    const message: FullMessageType = {
      id: "1",
      body: data.message,
      createdAt: new Date(),
      senderId: session?.data?.user?.id,
      seenBy: [],
      conversationId: conversationId,
      image: null,
      sender: {
        id: session?.data?.user?.id,
        name: session?.data?.user?.name,
        image: session?.data?.user?.image,
        email: session?.data?.user?.email,
        emailVerified: session?.data?.user?.emailVerified,
        password: session?.data?.user?.password,
        createdAt: session?.data?.user?.createdAt,
        updatedAt: session?.data?.user?.updatedAt,
      },
    };
    dispatch(addMessage(message));
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result?.info && typeof result.info !== "string") {
      axios.post("/api/messages", {
        image: result.info.secure_url,
        conversationId,
      });
    }
  };

  return (
    <div
      className={
        "py-4 px-4 bg-white dark:bg-gray-900 border-t flex items-center gap-2 lg:gap-4 w-full"
      }
    >
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          if (info) {
            handleUpload(result);
          }
        }}
        uploadPreset="ymwmaq0t"
      >
        <HiPhoto size={30} className="text-purple-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex items-center gap-2 lg:gap-4 w-full"}
      >
        <MessageInput
          id={"message"}
          register={register}
          errors={errors}
          required
          placeholder={"Write a message"}
        />
        <button
          type={"submit"}
          className={
            "rounded-full p-2 bg-purple-500 cursor-pointer hover:bg-purple-600 transition"
          }
        >
          <HiPaperAirplane size={18} className={"text-white"} />
        </button>
      </form>
    </div>
  );
};

export default Form;
