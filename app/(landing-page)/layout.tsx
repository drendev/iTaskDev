import LandingNavbar from "@/components/landing/landingNavbar/landingNavbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
