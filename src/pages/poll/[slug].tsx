/* eslint-disable @next/next/no-img-element */
import { prisma } from "../../server/db/client";
import type { Album, Track } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const sess = await getSession(context);

  if (!sess) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const album = await prisma.album.findFirst({
    where: { slug: context?.params?.slug as string },
  });
  const tracks = await prisma.track.findMany({
    where: { album: { id: album?.id } },
  });
  const hasVoted = await prisma.vote.findFirst({
    where: {
      userId: sess?.user?.id,
      album: album?.name,
    },
  });

  if (album) {
    return {
      props: {
        session: sess,
        album,
        tracks,
        hasVoted: hasVoted !== null,
      },
    };
  }

  return {
    props: {
      session: sess,
    },
  };
};

type Props = {
  album: Album;
  tracks: Track[];
  hasVoted: boolean;
};

export default function Albums(props: Props) {
  const { album, tracks, hasVoted } = props;
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = async (trackId: number) => {
    let toastId = toast.loading("voting...");
    if (hasVoted) {
      toast.error("you have already voted for this album", { id: toastId });
      return;
    }
    console.log("owo");
    try {
      await axios.post("/api/vote", {
        album: album.name,
        trackId: trackId.toString(),
      });
      toast.success("your vote has been casted!", { id: toastId });
      setTimeout(() => {
        router.push(`/results/${album.slug}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 min-w-screen overflow-x-hidden font-epilogue bg-gradient-to-t from-orange-400 to-sky-400">
      <div className="relative p-4 flex flex-col self-start lg:ml-48 md:ml-48 gap-6 mb-8">
        <img
          src={album.cover}
          alt={album.name}
          className="w-32 h-32 lg:w-48 lg:h-48 md:h-48 md:w-48 drop-shadow-2xl z-10 absolute -top-6 -left-2 lg:-top-14 lg:-left-8 md:-top-16 md:-left-8"
        ></img>
        <h2 className="z-50 text-[3.5rem] flex flex-col gap-2 leading-none lg:text-[5rem] md:text-[5rem] font-extrabold drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] text-sky-100">
          {album.name !== "i think you think too much of me"
            ? album.name
            : "ityttmom"}
          <span className="text-xs self-end text-sky-100 font-normal cursor-pointer">
            {hasVoted ? (
              <p onClick={() => router.push(`/results/${album.slug}`)}>
                [ view results ]
              </p>
            ) : (
              "[ click to vote your fav track ]"
            )}
          </span>
        </h2>
        <div className="grid grid-cols-1 text-left">
          {tracks.map((track: Track) => (
            <button
              key={track.id}
              className="text-orange-100 lg:text-base text-sm md:text-base drop-shadow-2xl p-1 hover:shadow-2xl hover:backdrop-saturate-[1.8] rounded cursor-pointer duration-300 text-left flex justify-between items-center"
              onClick={() => handleClick(track.id)}
            >
              {track.name}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 px-4 py-1 text-orange-100 self-start lg:ml-48 md:ml-48 text-sm">
        <p>
          made with {`<3`} by{" "}
          <a
            className="text-orange-800"
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
