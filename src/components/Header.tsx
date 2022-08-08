/* eslint-disable @next/next/no-img-element */
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
  callbackUrl?: string;
};

export default function Header(props: Props) {
  const { data: session } = useSession();

  return (
    <div className="w-full p-4 flex justify-start items-center">
      {session?.user && (
        <div className="flex items-center gap-2">
          <img
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
            className="rounded-full shadow-2xl w-10 h-10"
          ></img>
          <p className="text-zinc-900 drop-shadow-2xl">
            {session?.user?.name}
            {` >> `}
            <span
              onClick={() => signOut()}
              className="text-zinc-100 cursor-pointer"
            >
              sign out
            </span>
          </p>
        </div>
      )}
      {!session?.user && (
        <div className="flex items-center">
          <p
            className="text-zinc-100 cursor-pointer"
            onClick={() =>
              signIn("discord", {
                callbackUrl: props.callbackUrl,
              })
            }
          >
            sign in
          </p>
        </div>
      )}
    </div>
  );
}
