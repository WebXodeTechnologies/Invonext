import { auth } from "@clerk/nextjs/server";

export function getAuthUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
