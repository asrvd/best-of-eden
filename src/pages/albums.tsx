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
              src={album.cover}
              alt={album.name}
              className="shadow-lg select-none hover:shadow-2xl hover:scale-[1.02] duration-300 cursor-pointer"
              onClick={() => router.push(`/poll/${album.slug}`)}
            ></img>
            <p className="text-lg leading-tight">{(album.name === "i think you think too much of me") ? album.slug : album.name}</p>
            <p className="text-base leading-none">
              [{" "}
              {album.voteCount === 1
                ? `${album.voteCount} person voted`
                : `${album.voteCount} people voted`}{" "}
              ]
            </p>
          </div>
        ))}
      </div>
      {/* <button onClick={() => addAlbums()}>add</button> */}
    </div>
  );
}
