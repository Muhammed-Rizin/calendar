import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";

export interface Availability {
  startTime: string;
  endTime: string;
  dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number];
}
