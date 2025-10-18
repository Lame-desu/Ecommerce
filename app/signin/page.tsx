import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <main className="fixed inset-0 flex z-[800] flex-col items-center justify-center bg-white text-black px-4">
      {/* Close (Cancel) Button */}
      <Link
        href="/"
        className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-black transition-colors"
        aria-label="Cancel and go home"
      >
        <IoClose />
      </Link>

      {/* Card */}
      <div className="w-full max-w-md border border-gray-300 rounded-xl shadow-sm p-10 text-center">
        {/* Brand / Title */}
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Shaba Commerce
        </h1>
        <p className="text-gray-500 mb-8">Sign in to your account</p>

        {/* Provider Buttons */}
        <div className="space-y-4">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: searchParams?.callbackUrl ?? "",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full py-3 border border-gray-800 rounded-md text-lg font-medium transition-all hover:bg-black hover:text-white hover:shadow-md cursor-pointer"
              >
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
                Sign in with {provider.name}
              </button>
            </form>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 text-sm">
            or
          </span>
        </div>

        {/* Placeholder for email/password form (future use) */}
        <div className="text-sm text-gray-500">Email sign-up coming soon</div>

        {/* Terms */}
        <div className="mt-10 text-gray-500 text-sm">
          <p>
            By continuing, you agree to Shaba Commerce's{" "}
            <a href="#" className="underline hover:text-black">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-black">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Go Home Button */}
      <Link
        href="/"
        className="mt-6 text-gray-600 underline hover:text-black transition-colors"
      >
        Go to Home Page
      </Link>
    </main>
  );
}
