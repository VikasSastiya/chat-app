"use client";
import React from "react";
import Modal from "@/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
    alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src,
    alt = "Image",
}) => {
    if (!src) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80 relative">
                <Image
                    alt={alt}
                    src={src}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 320px, 320px"
                />
            </div>
        </Modal>
    );
};

export default ImageModal;
