"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { z } from "zod";

import { eventFormSchema } from "@/schema/events";
import { EventTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";

import "use-server";
import { and, eq } from "drizzle-orm";

export const createEvent = async (
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean; message?: string } | undefined> => {
  const { userId } = auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId == null) return { error: true };

  await db.insert(EventTable).values({ ...data, clerkUserId: userId });
  redirect("/events");
};

export const updateEvent = async (
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean; message?: string } | undefined> => {
  const { userId } = auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId == null) return { error: true };

  const { rowCount } = await db
    .update(EventTable)
    .set(data)
    .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

  if (rowCount === 0) return { error: true };
  redirect("/events");
};

export const deleteEvent = async (id: string): Promise<{ error: boolean } | undefined> => {
  const { userId } = auth();

  if (userId == null) return { error: true };

  const { rowCount } = await db
    .delete(EventTable)
    .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

  if (rowCount === 0) return { error: true };

  redirect("/events");
};
