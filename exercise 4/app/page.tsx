"use client";

import { useActionState } from "react";
import { submitForm } from "./form/submitForm";


const initialState = {
  success: false,
  message: "",
  error: "",
};

export default function FormPage() {
  const [state, formAction] =
    useActionState(submitForm, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 max-w-md"
    >
      <input className="text"
        type="text"
        name="firstName"
        placeholder="First Name"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
      />

      <button type="submit">
        Submit
      </button>

      {state.success && (
        <p>{state.message}</p>
      )}

      {state.error && (
        <p>{state.error}</p>
      )}
    </form>
  );
}