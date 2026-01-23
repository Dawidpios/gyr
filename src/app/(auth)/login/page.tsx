"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
});

type loginSchema = z.infer<typeof schema>;

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginSchema>({
    resolver: zodResolver(schema),
  });

  const loginHandler: SubmitHandler<loginSchema> = async (data) => {
    const loginStatus = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl,
    });
    if (!loginStatus?.ok) {
      toast.error("Login failed");
      return;
    }
    reset();
    toast.success("Login success!");
    window.location.href = loginStatus.url || "/";
  };

  return (
    <section
      className="w-full h-auto flex flex-col before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-200/55 before:via-orange-100/70 before:to-transparent"
      style={{ backgroundImage: "url('/hero/hero.png')" }}
    >
      <div className=" bg-main mt-auto mb-auto container mx-auto px-4 py-12 relative z-10 flex flex-col w-96 lg:w-fit h-fit rounded-lg bg-white/90 shadow-lg">
        <h2 className="text-center text-2xl text-black">
          Welcome Back! 
        </h2>
        <h3 className="text-center text-lg text-black">
          log in to continue<b></b>
        </h3>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full self-center mt-8 space-y-6"
        >
          <input defaultValue="true" name="remember" type="hidden" />
          <div className="-space-y-px rounded-md ">
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email address
              </label>
              <input
                {...register("email")}
                autoComplete="email"
                className="relative block bg-border-muted w-full rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-primary-accent focus:outline-none focus:ring-primary-accent mt-2"
                id="email-address"
                name="email"
                placeholder="Email address"
                required
                type="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm align-center font-bold mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                autoComplete="current-password"
                className="relative block bg-border-muted w-full rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-primary-accent focus:outline-none focus:ring-primary-accent mt-2"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm align-center font-bold mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            className={`w-full self-center p-2 bg-primary-accent bg-gradient-to-r from-primary-accent/35 via-primary-accent/65 to-orange-600 text-white text-xl rounded-lg cursor-pointer ${
              isSubmitting ? "opacity-50 cursor-not-allowed bg-grey" : ""
            }`}
            type="submit"
          >
            {isSubmitting
              ? "Checking credentials..."
              : "Log in"}
          </button>
          <div className="w-full flex items-center justify-center gap-2">
            <p>Don’t have an account?</p>
            <Link
            className="text-lg text-primary-accent font-bold"
            href="/register"
          >
            Sign up
          </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
};

const SignIn = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-auto mt-10 flex justify-center">
          Loading...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
};

export default SignIn;
