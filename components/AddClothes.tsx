import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

interface FileItem {
    file: File;
    url: string;
}

const DragAndDrop: React.FC<{ close: () => void }> = ({ close }) => {
    const [highlight, setHighlight] = useState(false);
    const [fileList, setFileList] = useState<FileItem[]>([]);

    const addClothesMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, FormData>({
        mutationFn: (files) => axios.post("/api/wardrobe/new", files),
        onSuccess: () => {
            alert("success")
        },
        onError: () => {
            alert("Error!")
        }
    })

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setHighlight(false);
        const files = Array.from(e.dataTransfer.files);
        const fileUrls: FileItem[] = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setFileList([...fileList, ...fileUrls]);
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
        setFileList([...fileList, ...fileUrls]);
    };

    const handleRemoveFile = (fileIndex: number) => {
        const filteredFileList = fileList.filter((_, index) => index !== fileIndex);
        setFileList(filteredFileList);
    };

    const addNewFiles = () => {
        const formData = new FormData();
        fileList.forEach((fileItem, index) => {
            formData.append(index.toString(), fileItem.file);
        });
        addClothesMutation.mutate(formData)
    }

    return (
        <div
            onClick={close}
            className="absolute top-0 left-0 z-50 w-full h-full flex flex-col items-center"
        >
            <div
                onClick={(e) => { e.stopPropagation() }}
                className="bg-white p-4 w-full md:w-[80%] sm:p-10 overflow-y-auto shadow-lg m-4 sm:m-10 h-[90vh] sm:h-[80vh]"
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
                        multiple
                        accept="*"
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
                <div className="mt-4 sticky top-0 z-20">
                    <button
                        onClick={addNewFiles}
                        className="bg-green-500 text-white px-4 py-2 text-center w-32 rounded-full"
                    >
                        {addClothesMutation.isLoading ? "Updating wardrobe..." : "Add all"}
                    </button>
                </div>
                <div id="files" className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                    {
                        fileList.map((file, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="relative pt-[100%] flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded select-none"
                                >
                                    <button
                                        className="absolute top-0 right-0 z-10 p-1 bg-white rounded-bl focus:outline-none"
                                        type="button"
                                        onClick={() => handleRemoveFile(ind)}
                                    >
                                        <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                    <img
                                        className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                                        alt=""
                                        src={file.url}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >

    )
}

export default DragAndDrop