import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { Error } from "./misc";

interface FileItem {
    file: File;
    url: string;
}


const EditClothePicture: React.FC<{ id: string, close: () => void }> = ({ id, close }) => {
    const [highlight, setHighlight] = useState(false);
    const [file, setFile] = useState<FileItem>();

    const changePictureMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, FormData>({
        mutationFn: (file) => axios.patch(`/api/wardrobe/item-image/${id}`, file),
        onSuccess: () => {
            const img = document.querySelector(`#${id}`) as HTMLImageElement
            if (img && file) {
                img.src = file.url
            }
            close()
        },
    })

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setHighlight(false);
        const files = Array.from(e.dataTransfer.files);
        const fileUrls: FileItem[] = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setFile(fileUrls[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = () => {
        setHighlight(false);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const fileUrls: FileItem[] = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setFile(fileUrls[0]);
    };
    const changeItemPicture = () => {
        if (changePictureMutation.isLoading || !file) return
        const formData = new FormData();
        formData.append("image", file.file);
        changePictureMutation.mutate(formData)
    }
    return (
        <div
            onClick={close}
            className="fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.2)] w-full h-full flex flex-col items-center"
        >
            <div
                onClick={(e) => { e.stopPropagation() }}
                className="bg-white p-4 w-[min(80%,400px)] rounded sm:p-10 overflow-y-auto shadow-lg m-4 sm:m-10 max-h-[90vh]"
            >
                <div
                    className={`relative p-4 border border-dashed ${highlight ? "border-blue-400 ring-4 ring-inset" : "border-gray-200"}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 opacity-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                    />
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="m-0">Drag your files here or click in this area.</p>
                    </div>
                </div>
                {
                    changePictureMutation.isError && <Error message={changePictureMutation.error.response?.data.message || "Failed to update item image"} />
                }

                {
                    file && (
                        <div
                            className="relative pt-[100%] flex flex-col w-full items-center overflow-hidden text-center bg-gray-100 border rounded select-none"
                        >
                            <img
                                className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                                alt=""
                                src={file.url}
                            />
                        </div>
                    )
                }
                <div className="my-4 sticky top-0 z-20">
                    <button
                        onClick={changeItemPicture}
                        className="bg-green-500 text-white px-4 py-2 text-center w-32 rounded-full"
                    >
                        {changePictureMutation.isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

        </div >

    )
}

export default EditClothePicture