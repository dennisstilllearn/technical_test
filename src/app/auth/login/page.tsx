"use client";
import { FormGenerator } from "@/components/form/FormGenerator";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
// saya membuat sebuah schema untuk form login.
export default function LoginPage() {
  const schema = {
    name: "login-form",
    definitions: [
      {
        name: "email",
        type: "text",
        label: { text: "Email" },
        rules: [{ name: "required", options: ["email"] }],
      },
      {
        name: "password",
        type: "password",
        label: { text: "Password" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;
  // saya mengimport useFormGen untuk membuat formGenerator
  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { email: "", password: "" },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  //mengganti (event: any) menjadi (model: FormModel) agar lebih aman.
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
    }
  };

  // TODO: Challenge: #4 - Change to use form generator with useFormGenerator hook and do the submit
  // TODO: Optional Challenge #1 - Use tailwindcss to style the login page
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-96 p-6 bg-white shadow-2xl rounded-xl border border-gray-300">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h2>
          {/* Tasks 1 point 4:saya telah membuat form login menggunakan form generator dengan hook useFormGen */}
          <FormGenerator
            schema={schema}
            state={state}
            model={model}
            updateModelValue={updateModelValue}
          />
          <Button
            type={"submit"}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
