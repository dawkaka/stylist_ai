import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { AiOutlineEdit } from "react-icons/ai"
import { Clothing } from "../types";
import { Input, Label, Select } from "./misc";
import EditClothePicture from "./EditClothePicture";

const ClothingItem: React.FC<Clothing & { selected: boolean, select: () => void }> = (clothing) => {
    const [type, setType] = useState(clothing.type);
    const [description, setDescription] = useState(clothing.description);
    const [color, setColor] = useState(clothing.color);
    const [brand, setBrand] = useState(clothing.brand);
    const [fit, setFit] = useState(clothing.fit)
    const [edited, setEdited] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)

    const saveMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, Omit<Clothing, "image" | "id">>({
        mutationFn: (data) => axios.put(`/api/wardrobe/${clothing.id}`, data).then(res => res.data),
        onSuccess: () => {
            setEdited(false)
        }
    });
    const deleteMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>>({
        mutationFn: (data) => axios.delete(`/api/wardrobe/${clothing.id}`
        ).then(res => res.data),
        onSuccess: () => {
            setDeleted(true)
        }
    });
    const handleSave = () => {
        if (saveMutation.isLoading) return
        saveMutation.mutate({
            type,
            description,
            color,
            brand,
            fit
        });
    };

    const handleDelete = () => {
        if (deleteMutation.isLoading) return
        if (confirm("Are you sure you want to delete")) {
            deleteMutation.mutate()
        }
    }

    if (deleted) {
        return null
    }

    return (
        <div id="cont" className="flex flex-col w-full shadow rounded-lg group items-center p-4 justify-center bg-white">
            {
                showImageModal && <EditClothePicture id={clothing.id} close={() => setShowImageModal(false)} />
            }
            <div className="relative w-full mb-4 pt-[100%]">
                <img src={clothing.image} id={clothing.id} alt={clothing.type} className="absolute top-0 left-0 w-full h-full w-mb-4 object-cover" />
                <button
                    className="absolute top-0 left-0 p-1 bg-white rounded-br opacity-0 group-hover:opacity-100"
                    type="button"
                    onClick={() => setShowImageModal(true)}
                >
                    <AiOutlineEdit size={25} />
                </button>
                <div
                    className="absolute pb-0 px-2 pt-1 top-0 right-0 bg-white rounded-bl opacity-0 group-hover:opacity-100"
                >
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            clothing.select()
                        }} value=""
                        checked={clothing.selected}
                        className="w-[18px] h-[18px] accent-green-600 bg-gray-100 border-gray-300 rounded"
                    />
                </div>
                <button
                    className="absolute bottom-0 right-0 z-10 p-1 bg-white rounded-tl opacity-0 group-hover:opacity-100 focus:outline-none"
                    type="button"
                    onClick={handleDelete}
                >
                    <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col">
                        <Label htmlFor={`type-${clothing.id}`} label="Type" />
                        <Select
                            id={`type-${clothing.id}`}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                                setEdited(true)
                            }
                            }
                            options={["Top", "Bottom", "Footwear", "Underwear", "Dress", "Outerwear", "Accessory"]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor={`fit-${clothing.id}`} label="Fit" />
                        <Select
                            id={`fit-${clothing.id}`}
                            value={fit}
                            onChange={(e) => {
                                setFit(e.target.value)
                                setEdited(true)
                            }
                            }
                            options={["Regular", "Relaxed", "Loose", "Tight", "Oversized"]}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Label htmlFor={`description-${clothing.id}`} label="Description" />
                    <Input
                        placeholder="A black jacket with long gold colored sleeves"
                        id={`description-${clothing.id}`}
                        type="text"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setEdited(true)
                        }
                        }
                    />

                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`color-${clothing.id}`} label="Color" />
                        <Input
                            placeholder="white, black, red, pink"
                            id={`color-${clothing.id}`}
                            type="text"
                            value={color}
                            onChange={(e) => {
                                setColor(e.target.value)
                                setEdited(true)
                            }
                            }
                        />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`brand-${clothing.id}`} label="Brand" />
                        <Input
                            placeholder="e.g Gucci, Lacorste, Louis vuitton"
                            id={`brand-${clothing.id}`}
                            type="text"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value)
                                setEdited(true)
                            }
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        edited &&
                        <button
                            onClick={handleSave}
                            className="flex py-1 justify-center rounded bg-green-500 text-white"
                        >
                            {saveMutation.isLoading ? "Saving..." : "  Save Changes"}
                        </button>
                    }
                </div>
            </div>
        </div >
    );
};

export const RecommendedItem: React.FC<Clothing> = (clothing) => {
    return (
        <div id="cont" className="flex flex-col w-full shadow rounded-lg group items-center p-4 justify-center bg-white">
            <div className="relative w-full mb-4 pt-[100%]">
                <img src={clothing.image} id={clothing.id} alt={clothing.type} className="absolute top-0 left-0 w-full h-full w-mb-4 object-cover" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col">
                        <Label htmlFor={`type-${clothing.id}`} label="Type" />
                        <input
                            className="border rounded px-2 text-gray-700 outline-none focus:border-green-500"
                            id={`type-${clothing.id}`}
                            type="text"
                            value={clothing.type}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor={`fit-${clothing.id}`} label="Fit" />
                        <input
                            className="border rounded px-2 text-gray-700 outline-none focus:border-green-500"
                            id={`fit-${clothing.id}`}
                            type="text"
                            value={clothing.fit}
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Label htmlFor={`description-${clothing.id}`} label="Description" />
                    <input
                        className="border rounded px-2 text-gray-700 outline-none focus:border-green-500"
                        id={`description-${clothing.id}`}
                        type="text"
                        value={clothing.description}
                        readOnly
                    />

                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`color-${clothing.id}`} label="Color" />
                        <input
                            className="border rounded px-2 text-gray-700 outline-none focus:border-green-500"
                            id={`color-${clothing.id}`}
                            type="text"
                            value={clothing.color}
                            readOnly
                        />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`brand-${clothing.id}`} label="Brand" />
                        <input
                            className="border rounded px-2 text-gray-700 outline-none focus:border-green-500"
                            id={`brand-${clothing.id}`}
                            type="text"
                            value={clothing.brand}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ClothingItem;
