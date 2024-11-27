import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/press-reporter-fallowing-leads-case_23-2149579751.jpg?t=st=1731935800~exp=1731939400~hmac=e5a65f6e8b56fce1cf5390a0e7cc717d7943078c83abde1834aebda148d5cf90&w=1480')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SignUp />
    </div>
  );
}
