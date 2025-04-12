"user server";

import { auth } from "@clerk/nextjs/server";

export async function getWorkflowsForUser(userId: string) {
  const { userId: clerkUserId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated User!");
  }

  if (userId === clerkUserId) {
    return [];
  }
}
