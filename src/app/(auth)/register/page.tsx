import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./_components/register-form";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return <RegisterForm />;
}
