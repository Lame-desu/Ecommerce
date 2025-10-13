import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button
        type="submit"
        className="cursor-pointer p-3 rounded-sm border-2 border-gray-600 hover:ring hover:bg-gray-200"
      >
        Signin with Google
      </button>
    </form>
  );
}
