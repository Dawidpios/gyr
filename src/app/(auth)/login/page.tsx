"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
// import { FaGithub } from "react-icons/fa";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
});

type loginSchema = z.infer<typeof schema>;

const SignIn = () => {
  const router = useRouter();
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
    });
    if (!loginStatus?.ok && loginStatus?.status === 401) {
      toast.error(`Login failed`);
      return;
    }
    reset();
    toast.success(`Login success!`);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const githubLoginHandler = async () => {
    signIn("github");
  };

  return (
    <section className="w-full h-auto mt-10 flex flex-col">
      <h2 className="text-center text-2xl text-black">
        Sign in to your account
      </h2>
      <h3 className="text-center text-lg text-black">
        Or sign up for a <b></b>
        <Link className="text-lg text-purple" href="/register">
          new account
        </Link>
      </h3>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-90 lg:w-1/3 self-center mt-8 space-y-6"
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
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-green focus:outline-none focus:ring-green mt-2"
              id="email-address"
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 font-bold">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              autoComplete="current-password"
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-green focus:outline-none focus:ring-green mt-2"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <button
          className={`w-full self-center p-2 bg-black text-white text-xl rounded-lg cursor-pointer ${
            isSubmitting ? "opacity-50 cursor-not-allowed bg-grey" : ""
          }`}
          type="submit"
        >
          {isSubmitting
            ? "Checking credentials..."
            : "Sign in with credentials"}
        </button>
        <button
          className="w-full self-center p-2 border-2 border-white bg-black text-white text-xl rounded-lg"
          onClick={githubLoginHandler}
        >
          Sign in with GitHub{" "}
        </button>
      </form>
      <Toaster />
    </section>
  );
};

export default SignIn;
