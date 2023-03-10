import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Clothing } from "../types";



const ClothingItem: React.FC<Clothing> = (clothing) => {
    const [name, setName] = useState(clothing.name);
    const [description, setDescription] = useState(clothing.description);
    const [color, setColor] = useState(clothing.color);
    const [brand, setBrand] = useState(clothing.brand);
    const [size, setSize] = useState(clothing.size)
    const [edit, setEdit] = useState(false)
    const saveMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, Omit<Clothing, "image">>({
        mutationFn: (data) => axios.put(`/api/wardrobe/${clothing.id}`, data).then(res => res.data)
    });

    const handleSave = () => {
        saveMutation.mutate({
            id: clothing.id,
            name,
            description,
            color,
            brand,
            size
        });
    };

    return (
        <div className="flex flex-col md:flex-row rounded-lg items-center p-4 justify-center bg-white border">
            <img src={clothing.image} alt={clothing.name}
                onClick={() => setEdit(true)}
                className="w-[90%] sm:w-[220px] mb-4"
                style={{
                    objectFit: "cover"

                }}
            />
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 text-gray-500">
                <div className="flex flex-col">
                    <label htmlFor={`name-${clothing.id}`}>Name</label>
                    <input
                        className="border rounded px-2"
                        id={`name-${clothing.id}`}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`description-${clothing.id}`}>Description</label>
                    <input
                        className="border rounded px-2"
                        id={`description-${clothing.id}`}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor={`color-${clothing.id}`}>Color</label>
                    <input
                        className="border rounded px-2"
                        id={`color-${clothing.id}`}
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`brand-${clothing.id}`}>Brand</label>
                    <input
                        className="border rounded px-2"
                        id={`brand-${clothing.id}`}
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>

                {/* add other input fields for other fields in prisma schema */}
                <div className="flex flex-col">
                    <button
                        onClick={handleSave}
                        className="flex py-1 justify-center rounded bg-green-500 text-white"
                    >
                        Save Changes
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ClothingItem;
