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
    ],
  } as FormSchema;

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { first_name: "", last_name: "" },
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
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-black text-left">Form Page</h1>
          <form action={logout} className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600"
            >
              Logout
            </button>
          </form>
        </div>
        <div className="flex gap-8 mb-6 ml-5 mt-5">
          <form onSubmit={handleSubmit(logSubmit)}>
            <FormGenerator
              schema={schema}
              state={state}
              model={model}
              updateModelValue={updateModelValue}
            />
            <Button className="mt-5" type={"submit"}>
              Submit
            </Button>
          </form>
        </div>
        <hr />
      </div>
    </>
  );
}
