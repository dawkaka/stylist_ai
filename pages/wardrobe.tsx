import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { HiViewGridAdd } from "react-icons/hi"
import DragAndDrop from "@/components/AddClothes";
import ClothingItem from "@/components/Item";
// import { useSession } from "next-auth/client";
interface WardrobeProps {
    // any props that you might pass down
}

export default function Wardrobe({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { image, name } = user
    const [openAdd, setOpenAdd] = useState(false)
    return (
        <div className="min-h-screen">
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 border-r z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="w-full h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col gap-5">
                        <div className="flex py-10 justify-between  items-center border-b overflow-x-hidden">
                            <img
                                src={"/jackets-14.webp"}
                                alt={"your profile picture"}
                                style={{
                                    height: "70px",
                                    width: "70px"
                                }}
                                className="border rounded-full"
                            />
                            <p className="p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white">
                                {name}
                            </p>
                        </div>

                        <div
                            role="button"
                            onClick={() => setOpenAdd(true)}
                            className="pointer w-full flex justify-between items-center  bg-green-500 text-white px-6 py-4 font-normal rounded-lg dark:text-white hover:bg-green-600">
                            <span className="flex-1 whitespace-nowrap text-xl">Add clothes</span>
                            <HiViewGridAdd size={30} />
                        </div>
                        <div className="w-full flex justify-between items-center px-6 py-4 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="flex-1 whitespace-nowrap">Generate outfit</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 flex justify-center flex-wrap gap-6">
                {
                    new Array(100).fill("s").map((a, ind) => <ClothingItem
                        key={ind}
                        id="hahaahaha"
                        name="T-shirt"
                        brand="Gucci"
                        size="xl"
                        color="black"
                        description="a black jacket with belts"
                        image="/jackets-14.webp"
                    />)
                }
            </div>
            {openAdd && <DragAndDrop close={() => setOpenAdd(false)} />}

        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session || !session.user) {
        return { redirect: { destination: "/auth/signin" } };
    }
    return {
        props: { user: session.user },
    }
}