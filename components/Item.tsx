import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Clothing } from "../types";
import { Input, Label } from "./misc";



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
        <div className="flex flex-col shadow-lg rounded-lg items-center p-4 justify-center bg-white">
            <img src={clothing.image} alt={clothing.name}
                onClick={() => setEdit(true)}
                className="max-[574px]:h-[80vw] max-[574px]:w-[80vw] h-[240px] w-[240px] mb-4"
                style={{
                    objectFit: "cover"
                }}
            />
            <div className="flex flex-col gap-2 max-[574px]:w-[80vw]  w-[240px]">
                <div className="flex flex-col">
                    <Label htmlFor={`name-${clothing.id}`} label="Name" />
                    <Input
                        placeholder="eg: T-shirt, jacket, dress, heels, sneaker etc."
                        id={`name-${clothing.id}`}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor={`description-${clothing.id}`} label="Description" />
                    <Input
                        placeholder="A black jacket with long gold colored sleeves"
                        id={`description-${clothing.id}`}
                        type="text"
                        value={description}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div className="flex gap-4 w-full">
                    <div
                        className="flex flex-col"
                        style={{ width: "110px" }}
                    >
                        <Label htmlFor={`color-${clothing.id}`} label="Color" />
                        <Input
                            placeholder="white, black, red, pink"
                            id={`color-${clothing.id}`}
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div
                        className="flex flex-col"
                        style={{ width: "110px" }}
                    >
                        <Label htmlFor={`brand-${clothing.id}`} label="Brand" />
                        <Input
                            placeholder="e.g Gucci, Lacorste, Loui vuitton"
                            id={`brand-${clothing.id}`}
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
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
        </div >
    );
};

export default ClothingItem;
