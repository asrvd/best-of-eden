/* eslint-disable @next/next/no-img-element */
import { prisma } from "../../server/db/client";
import type { Album, Track } from "@prisma/client";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  const album = await prisma.album.findFirst({
    where: { slug: context?.params?.slug as string },
  });
  const tracks = await prisma.track.findMany({
    where: { album: { id: album?.id } },
    orderBy: { voteCount: "desc" },
  });

  if (album) {
    return {
      props: {
        session,
        album,
        tracks,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

type Props = {
  album: Album;
  tracks: Track[];
};

export default function Albums(props: Props) {
  const { album, tracks } = props;
  const router = useRouter();

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 min-w-screen overflow-x-hidden font-epilogue bg-gradient-to-t from-orange-400 to-sky-400">
      <div className="relative p-4 flex flex-col self-start lg:ml-48 md:ml-48 gap-6 mb-8">
        <img
          src={`https://${
            process.env.NEXT_PUBLIC_CI_TOKEN
          }.cloudimg.io/${album.cover.substring(
            8
          )}?force_format=webp&width=300&height=300`}
          alt={album.name}
          className="w-32 h-32 lg:w-48 lg:h-48 md:h-48 md:w-48 drop-shadow-2xl z-10 absolute -top-6 -left-2 lg:-top-14 lg:-left-8 md:-top-16 md:-left-8"
        ></img>
        <h2 className="z-50 text-[3.5rem] flex flex-col gap-2 leading-none lg:text-[5rem] md:text-[5rem] font-extrabold drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] text-sky-100">
          {album.name !== "i think you think too much of me"
            ? album.name
            : "ityttmom"}
          <span className="text-xs text-sky-100 self-end font-normal">
            [ poll results ] [{" "}
            {album.voteCount === 1
              ? `${album.voteCount} vote`
              : `${album.voteCount} votes`}{" "}
            ]
          </span>
        </h2>
        <div className="grid grid-cols-1 text-left">
          {tracks.map((track: Track, index: number) => (
            <button
              key={track.id}
              className="text-orange-100 lg:text-base text-sm md:text-base drop-shadow-2xl p-1 hover:shadow-2xl hover:backdrop-saturate-[1.8] rounded cursor-pointer duration-300 text-left flex justify-between items-center"
            >
              <p>{track.name}</p>
              <p>{((track.voteCount / album.voteCount) * 100).toFixed(0)}%</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex absolute bottom-0 px-4 py-1 gap-2 text-orange-100 self-start lg:ml-48 md:ml-48 text-xs lg:text-sm md:text-sm">
        <p className="text-xs lg:text-sm md:text-sm">
          made with {`<3`} by{" "}
          <a
            className="text-orange-800 font-semibold"
            target={"_blank"}
            href="https://github.com/asrvd"
            rel={"noreferrer"}
          >
            ashish
          </a>
        </p>
        {" | "}
        <p className="text-xs lg:text-sm md:text-sm">
          go back to{" "}
          <span
            className="text-orange-800 font-semibold cursor-pointer"
            onClick={() => {
              router.push("/albums");
            }}
          >
            albums
          </span>
        </p>
      </div>
    </div>
  );
}
