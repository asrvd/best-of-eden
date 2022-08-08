/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import Header from "../components/Header";
import { SiDiscord } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      {session?.user && (
        <div className="font-epilogue relative min-w-screen min-h-screen h-screen flex flex-col p-4 justify-center items-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-right">
          <div className="absolute top-0 w-full lg:w-1/2 md:w-2/3 flex justify-start items-center h-[10%]">
            <Header callbackUrl="/albums" />
          </div>
          <div className="relative flex flex-col w-full lg:w-1/2 md:w-2/3 items-center justify-start h-[80%] pt-36 lg:pt-48 md:pt-48">
            <img
              src="https://i.imgur.com/JTGzPNw.png"
              alt="logo"
              className="z-10 absolute w-72 h-72 md:w-80 md:h-80 lg:h-96 lg:w-96 top-24 md:top-16 right-4 lg:top-16 lg:right-64 md:right-24 grayscale saturate-50 opacity-40"
            ></img>
            <h2 className="z-50 self-start text-[5rem] leading-none font-extrabold drop-shadow-2xl text-gray-200">
              best of eden
            </h2>
            <p className="z-50 self-start text-gray-100 drop-shadow-2xl">
              a place for ranking eden tracks from each album based on public
              votes
            </p>
            <button
              className="self-start flex justify-center items-center gap-2 text-base focus:outline-none bg-gray-200 text-gray-800 shadow-lg hover:shadow-2xl p-4 rounded mt-16 lg:mt-32 duration-300 md:mt-28"
              onClick={() => router.push("/albums")}
            >
              <FiExternalLink />
              start voting
            </button>
          </div>
          <div className="absolute flex justify-start items-center bottom-0 px-4 py-1 text-gray-600 w-full md:w-2/3 lg:w-1/2 text-sm">
            <p className="self-start">
              made with {`<3`} by{" "}
              <a
                className="text-gray-800 font-semibold"
                target={"_blank"}
                href="https://github.com/asrvd"
                rel={"noreferrer"}
              >
                ashish
              </a>
            </p>
          </div>
        </div>
      )}

      {!session?.user && (
        <div className="font-epilogue relative min-w-screen min-h-screen h-screen flex flex-col p-4 justify-center items-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-right">
          <div className="absolute top-0 w-full lg:w-1/2 md:w-2/3 flex justify-start items-center h-[10%]">
            <Header callbackUrl="/albums" />
          </div>
          <div className="relative flex flex-col w-full lg:w-1/2 md:w-2/3 items-center justify-start h-[80%] pt-36 lg:pt-48 md:pt-48">
            <img
              src="https://i.imgur.com/JTGzPNw.png"
              alt="logo"
              className="z-10 absolute w-72 h-72 md:w-80 md:h-80 lg:h-96 lg:w-96 top-24 md:top-16 right-4 lg:top-16 lg:right-64 md:right-24 grayscale saturate-50 opacity-40"
            ></img>
            <h2 className="z-50 self-start text-[5rem] leading-none font-extrabold drop-shadow-2xl text-gray-200">
              best of eden
            </h2>
            <p className="z-50 self-start text-gray-100 drop-shadow-2xl">
              a place for ranking eden tracks from each album based on public
              votes
            </p>
            <button
              className="self-start flex justify-center items-center gap-2 text-base focus:outline-none bg-gray-200 text-gray-800 shadow-lg hover:shadow-2xl p-4 rounded mt-16 lg:mt-32 duration-300 md:mt-28 focus:ring-0 outline-none"
              onClick={() =>
                signIn("discord", {
                  callbackUrl: "/albums",
                })
              }
            >
              <SiDiscord />
              sign in with discord
            </button>
          </div>
          <div className="absolute flex justify-start items-center bottom-0 px-4 py-1 text-gray-600 w-full md:w-2/3 lg:w-1/2 text-sm">
            <p className="self-start">
              made with {`<3`} by{" "}
              <a
                className="text-gray-800 font-semibold"
                target={"_blank"}
                href="https://github.com/asrvd"
                rel={"noreferrer"}
              >
                ashish
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
