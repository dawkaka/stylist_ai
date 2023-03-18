import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Virtual Wardrobe and Ai stylist</title>
        <meta name="description" content="Have your entire wardrobe in one place and let ai stylist recommend outfits for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="relative h-[100vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-gray-100 to-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="absolute inset-x-0 top-0 h-full rotate-180 text-gray-500/20 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,white,white)]">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"><defs>
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse" x="50%" y="100%" patternTransform="translate(0 -1)">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-8xl text-center lg:max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl xl:text-7xl">Virtual Wardrobe And <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Ai Stylist</span></h1>
            <h2 className="mt-4 text-lg font-normal leading-7 text-gray-700 sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9">Have your entire wardrobe in one place and let our AI stylist recommend outfits for you. Say goodbye to the hassle of choosing what to wear.</h2>
          </div>
          <div className="mt-8 flex flex-row sm:items-center justify-center lg:mt-10">
            <Link href="/auth/signin"
              className="inline-flex h-12 items-center bg-green-500 text-white justify-center rounded-xl border  px-6 py-2.5 text-base font-semibold transition-all duration-200 hover:border-green-700"
            >Get started for free</Link>
          </div>
          <div className="mx-auto mt-8 max-w-xs md:flex md:max-w-lg md:flex-col md:items-center md:justify-center md:space-y-4 lg:mt-12">
            <div className="flex shrink-0 justify-center -space-x-3 overflow-hidden">
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
