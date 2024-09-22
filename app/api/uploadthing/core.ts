
import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const user = currentUser();
  if (!user) throw new Error("Unauthorized");
  return { userId: user };
}

export const ourFileRouter = {
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;