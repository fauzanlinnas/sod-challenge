"use client";
import { FormGenerator } from "@/components/form/FormGenerator";
import type { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const schema = {
    name: "login-form",
    definitions: [
      {
        name: "email",
        type: "text",
        label: { text: "Username" },
        rules: [{ name: "required" }],
      },
      {
        name: "password",
        type: "password",
        label: { text: "password" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;

  const router = useRouter();
  const searchParams = useSearchParams();

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { username: "", password: "" },
  });

  const handleLogin = async (model: FormModel) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
    if (res.status === 200) {
      let returnUrl = searchParams.get("return");
      returnUrl = (returnUrl && decodeURIComponent(returnUrl)) ?? "/";
      router.push(returnUrl);
    } else {
      console.error("Login failed");
    }
  };

  const handleInvalid = async (model: FormModel) => {
    console.error("Form validation failed", state.errors);
  };

  // TODO: Challenge: #4 - Change to use form generator with useFormGenerator hook and do the submit
  // TODO: Optional Challenge #1 - Use tailwindcss to style the login page
  return (
    <div className="w-full md:w-96">
      <form onSubmit={handleSubmit(handleLogin, handleInvalid)}>
        <h1>Login</h1>
        <FormGenerator
          schema={schema}
          state={state}
          model={model}
          updateModelValue={updateModelValue}
        />
        <div>
          <button type="submit" className="">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
