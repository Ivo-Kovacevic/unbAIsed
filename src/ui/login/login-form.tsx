"use client";

import { useActionState } from "react";
import Button from "../Button";
import { authenticate } from "@/lib/userActions";
import { useSearchParams } from "next/navigation";

export default function Form() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Log in</h1>
      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="rounded-full border-2 p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          className="rounded-full border-2 p-2"
          required
          minLength={6}
        />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button className="hover:bg-light-secondary focus-visible:bg-light-secondary">Login</Button>

      {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
    </form>
  );
}
