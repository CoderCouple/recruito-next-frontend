import { auth } from "@clerk/nextjs/server";

export async function getUserWorkflows() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated User");
  }
}
