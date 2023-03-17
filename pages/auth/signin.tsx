import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiOutlineTwitter } from "react-icons/ai"

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <main className="rounded-2xl py-10 px-10 border w-full max-w-[400px] shadow">
                <div className="w-full mb-10 flex flex-col gap-4 items-center justify-center">
                    <div className="rounded-full flex items-center justify-center w-20 h-20 bg-green-500">
                        <span className="text-white font-bold">VW</span>
                    </div>
                    <h3 className="">Sign in to <span className="text-green-500">Virtual Wardrobe</span></h3>
                </div>
                <div className="flex gap-4 flex-col w-full">
                    {Object.values(providers).map((provider) => (
                        <>
                            <Provider key={provider.name} signIn={() => signIn(provider.id)} name={provider.name} />
                            <Provider key={provider.name} signIn={() => signIn(provider.id)} name={"Twitter"} />
                            <Provider key={provider.name} signIn={() => signIn(provider.id)} name={"Facebook"} />
                        </>

                    ))}
                </div>
            </main>
        </div>
    )
}


function Provider({ signIn, name }: { signIn: () => void, name: string }) {
    let icon = <FcGoogle size={25} />
    let color = ""
    switch (name) {
        case "Twitter":
            icon = <AiOutlineTwitter color="#1DA1F2" size={25} />
            break;
        case "Facebook":
            icon = <FaFacebook color="#4267B2" size={25} />
            break;
        default:
            break;
    }
    return (
        <button
            className="appearance-none flex items-center justify-center gap-4 rounded-lg border py-3 px-2 hover:border-green-500"
            onClick={signIn}
        >
            <span className="w-[200px] flex items-center gap-4 overflow-x-hidden">
                {icon}
                <span className="text-gray-600">Sign in with {name}</span>
            </span>
        </button>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    // if (session) {
    //     return { redirect: { destination: "/" } };
    // }
    const providers = await getProviders();
    return {
        props: { providers: providers ?? [] },
    }
}