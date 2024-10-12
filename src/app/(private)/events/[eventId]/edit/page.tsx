import EventForm from "@/components/forms/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const Page = async ({ params: { eventId } }: { params: { eventId: string } }) => {
  const { userId, redirectToSignIn } = auth();
  if (userId === null) return redirectToSignIn();

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) => and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (!event) return notFound();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm event={{ ...event, description: event.description || undefined }} />
      </CardContent>
    </Card>
  );
};

export default Page;
