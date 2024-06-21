"use client";
import { logout } from "@/actions/logout";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { FormGenerator } from "@/components/form/FormGenerator";
import { Button } from "@/components/ui/button";

export default function FormPage() {
  const schema = {
    name: "simple-form",
    definitions: [
      {
        name: "first_name",
        type: "text",
        label: { text: "First Name" },
        rules: [{ name: "required" }],
      },
      {
        name: "last_name",
        type: "text",
        label: { text: "Last Name" },
        rules: [{ name: "required" }],
      },
      {
        name: "password",
        type: "password",
        label: { text: "Password" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { first_name: "", last_name: "", password: "" },
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log(model, state.isDirty);
  // };

  const logSubmit = async (model: FormModel) => {
    console.log(model);
  };
  // TODO: Challenge #2: Browser console is throwing a warning. Fix it.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Page</h1>
        <form onSubmit={handleSubmit(logSubmit)} className="space-y-4">
          <FormGenerator
            schema={schema}
            state={state}
            model={model}
            updateModelValue={updateModelValue}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </Button>
        </form>
        <hr className="my-6 border-gray-300" />
        <form action={logout} className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
