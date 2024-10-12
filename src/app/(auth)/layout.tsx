import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = auth();
  if (userId !== null) redirect("/");
  return <div className="min-h-screen flex flex-col justify-center items-center">{children}</div>;
};

export default AuthLayout;
