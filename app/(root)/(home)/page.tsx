import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
