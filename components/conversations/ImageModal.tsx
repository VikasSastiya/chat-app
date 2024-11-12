"use client"
import React from 'react';
import Modal from "@/components/Modal";
import Image from 'next/image'

interface ImageModalProps {
    isOpen?: boolean;
     onClose: () => void;
     src?: string | null;
     alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ( { isOpen, onClose, src, alt = 'Image' } ) => {
    if (!src) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image alt={alt} src={src} className={"object-cover"} fill />
            </div>
        </Modal>
    );
};

export default ImageModal;