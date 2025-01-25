import { signOut } from "@/auth";
import Button from "./Button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button>Sign Out</Button>
    </form>
  );
}
