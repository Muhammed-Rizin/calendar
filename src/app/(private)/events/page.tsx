import Link from "next/link";

import { CalendarPlus, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { cn } from "@/lib/utils";

import { CopyEventButton } from "@/components/CopyEvent";
import { EventCardProps } from "@/types/events";

import { formatEventDescription } from "@/lib/formatters";

const Page = async () => {
  const { userId, redirectToSignIn } = auth();

  if (userId === null) return redirectToSignIn();

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">Events</h1>
        <Button asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6" /> New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto" />
          You do not have any events yer. Create your first event to get started!
          <Button size="lg" className="text-lg" asChild>
            <Link href="/events/new">
              <CalendarPlus className="mr-4 size-6" /> New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Page;

const EventCard = ({
  id,
  name,
  description,
  durationInMinutes,
  clerkUserId,
  isActive,
}: EventCardProps) => {
  const opacity = !isActive ? "opacity-50" : "";
  return (
    <Card className={cn("flex flex-col", !isActive && "boarder-secondary/50")}>
      <CardHeader className={opacity}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatEventDescription(durationInMinutes)}</CardDescription>
      </CardHeader>
      {description !== null && <CardContent className={opacity}>{description}</CardContent>}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && <CopyEventButton variant="outline" eventId={id} clerkUserId={clerkUserId} />}
        <Button asChild>
          <Link href={`events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
