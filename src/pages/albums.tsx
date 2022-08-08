/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { prisma } from "../server/db/client";
import type { Album } from "@prisma/client";
import Header from "../components/Header";

export async function getStaticProps() {
  const albums = await prisma.album.findMany();
  if (albums) {
    return {
      props: {
        albums,
      },
      revalidate: 1,
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

type Props = {
  albums: Album[];
};

export default function Albums(props: Props) {
  const router = useRouter();

  return (
    <div className="relative p-4 flex min-w-screen min-h-screen h-screen flex-col justify-center items-center bg-gradient-to-r font-epilogue from-slate-500 to-yellow-100 gap-4">
      <div className="w-full lg:w-2/3 md:w-2/3 absolute top-0 h-[15%]">
        <Header callbackUrl="/albums" />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-2 gap-4 w-full lg:w-2/3 md:w-2/3">
        {props?.albums?.map((album) => (
          <div
            key={album.name}
            className="w-full h-full  flex flex-col justify-center items-center gap-2 tracking-tighter leading-none"
          >
            <img
              src={`https://${
                process.env.NEXT_PUBLIC_CI_TOKEN
              }.cloudimg.io/${album.cover.substring(
                8
              )}?force_format=webp&width=300&height=300`}
              alt={album.name}
              className="shadow-lg select-none hover:shadow-2xl hover:scale-[1.02] duration-300 cursor-pointer"
              onClick={() => router.push(`/poll/${album.slug}`)}
            ></img>
            <p className="text-lg leading-tight text-gray-800">
              {album.name === "i think you think too much of me"
                ? album.slug
                : album.name}
            </p>
          </div>
        ))}
      </div>
      <div className="absolute flex justify-start items-center bottom-0 px-4 py-1 text-gray-600 w-full lg:w-2/3 md:w-2/3 text-sm">
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
  );
}
