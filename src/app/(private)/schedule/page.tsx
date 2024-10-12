import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";

import ScheduleForm from "@/components/forms/Schedule";

export const revalidate = 0;

const Page = async () => {
  const { userId, redirectToSignIn } = auth();
  if (userId == null) return redirectToSignIn();

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  });

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
};

export default Page;
