import EventForm from "@/components/forms/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>New Event</CardTitle>
      </CardHeader>
      <CardContent><EventForm /></CardContent>
    </Card>
  );
};

export default Page;
