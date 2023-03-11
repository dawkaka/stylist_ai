import axios from "axios";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { useQuery } from "react-query";

interface FileItem {
    file: File;
    url: string;
}

const GenerateOutif: React.FC<{ close: () => void }> = ({ close }) => {
    const [step, setStep] = useState(0)

    const { data, isLoading, isError, error } = useQuery({ queryFn: () => axios.get("/api/wardrobe/generate").then(res => res.data) })

    return (
        <div
            onClick={close}
            className="absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] w-full h-full flex flex-col items-center justify-center"
        >
            <div
                onClick={(e) => { e.stopPropagation() }}
                className="bg-white py-4 w-full md:w-[min(90%,600px)] min-h-[50vh] rounded-lg overflow-y-auto shadow-lg mt-[-20px] max-h-[90vh]"
            >
                <div className="sticky top-0 flex w-full px-4 pb-2 border-b items-center justify-between">

                    {
                        step > 0 ? <button onClick={() => setStep(0)}>
                            <BiArrowBack size={25} />
                        </button> : <span>{' '}</span>
                    }
                    {
                        step === 0 ?
                            <button
                                className="button px-4 py-1 shadow  rounded-lg"
                                onClick={() => setStep(1)}
                            >
                                Generate</button> :
                            <span>{' '}</span>
                    }
                </div>
                <div className="flex flex-col w-full h-auto">
                    {
                        step === 0 && (
                            <div className="flex flex-col p-4">
                                <label className="text-gray-600">What's the occasion?</label>
                                <input
                                    className="border rounded px-3 py-2 text-lg"
                                    placeholder="eg. An outfit to a wedding"
                                />
                                <div>
                                    <h4 className="text-gray-900 mt-10">Examples</h4>
                                    <p className="text-sm text-gray-600">A casual outfit to a date</p>
                                    <p className="text-sm text-gray-600">Wedding</p>
                                    <p className="text-sm text-gray-600">A business meeting</p>
                                    <p className="text-sm text-gray-600">An awards show</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        step === 1 && (
                            <div className="w-full">
                                <p className="my-4 text-center text-gray-800">Generating outfit...</p>
                                <div className="rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div >

    )
}

export default GenerateOutif