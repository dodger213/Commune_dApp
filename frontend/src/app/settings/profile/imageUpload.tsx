import React, { ChangeEvent, useState } from 'react';

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];

            // Check if the selected file is an image file
            if (selectedFile.type.startsWith('image/')) {
                setSelectedImage(selectedFile);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };

                reader.readAsDataURL(selectedFile);

                onImageSelect(selectedFile);
            } else {
                // Reset if the selected file is not an image file
                setSelectedImage(null);
                setPreviewUrl(null);
                onImageSelect(null);
                alert('Please select a valid image file.');
            }
        } else {
            setSelectedImage(null);
            setPreviewUrl(null);
            onImageSelect(null);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <div>
                    <p>Selected Image: {selectedImage.name}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
