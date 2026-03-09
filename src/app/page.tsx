import { auth } from "@clerk/nextjs/server";
import { LandingContent } from "@/components/landing-content";

export default async function LandingPage() {
  const { userId } = await auth();
  const isAuthenticated = !!userId;

  return <LandingContent isAuthenticated={isAuthenticated} />;
}
