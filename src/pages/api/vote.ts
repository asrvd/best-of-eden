import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { prisma } from "../../server/db/client";

const vote = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const { album, trackId } = req.body;

  if (session?.user) {
    if (req.method === "POST") {
      try {
        await prisma.user.update({
          where: { id: session?.user?.id },
          data: {
            votes: {
              create: {
                album: album as string,
                track: Number(trackId as string),
              },
            },
          },
        });
        await prisma.album.update({
          where: {
            name: album as string,
          },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        });
        await prisma.track.update({
          where: {
            id: Number(trackId as string),
          },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        });
        res.status(200).json({ message: "Voted" });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
};

export default vote;
