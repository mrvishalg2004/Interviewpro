import { SignUp } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function Page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/blue-geometric-composition-paperboard-background-with-copyspace_24972-348.jpg?t=st=1732713080~exp=1732716680~hmac=cff7ab612b774a5c3ec8a6b0027681a2953d773001a7368995031f10bf72b7a4&w=1480')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SignUp />
    </div>
  );
}
