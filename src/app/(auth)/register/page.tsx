"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "User name must be 5 or more characters long" })
    .max(10, { message: "Must be 10 or less characters long" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be 8 or more characters long" }),
  email: z.string().email(),
});

type typeRegisterSchema = z.infer<typeof schema>;

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<typeRegisterSchema>({
    resolver: zodResolver(schema),
  });
  const submitHandler: SubmitHandler<typeRegisterSchema> = async (formData) => {
    try {
      const { success } = schema.safeParse(formData);
      if (success) {
        const { name, password, email } = formData;
        const res = await fetch("api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password, email }),
        });
        if (res.status === 200) {
          reset();
          toast.success("Sign up success!");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch {
      toast.error("Sign up failed!");
    }
  };
  return (
    <section
      className="w-full flex min-h-screen bg-cover items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-200/55 before:via-orange-100/70 before:to-transparent px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/register/registerBackground.png')" }}
    >
      <div className="w-fit h-fit bg-main p-6 rounded-lg z-10 max-w-md space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-primary">
            Sign up to discover recipes and plan your shopping <b />
          </p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-6">
          <input defaultValue="true" name="remember" type="hidden" />
          <div className="-space-y-px rounded-md ">
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                {...register("name")}
                autoComplete="name"
                className="relative block w-full rounded-lg bg-border-muted border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-primary-accent focus:outline-none focus:ring-primary-accent mt-2"
                id="name"
                name="name"
                placeholder="Name"
                required
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 font-bold">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email address
              </label>
              <input
                {...register("email")}
                autoComplete="email"
                className="relative block w-full bg-border-muted rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-primary-accent focus:outline-none focus:ring-primary-accent mt-2"
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
                autoComplete="new-password"
                className="relative block w-full bg-border-muted rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-2 focus:z-10 focus:border-primary-accent focus:outline-none focus:ring-primary-accent mt-2"
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
          <div>
            <button
              className={`group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm text-white font-bold bg-primary-accent bg-gradient-to-r from-primary-accent/35 via-primary-accent/65 to-orange-600
    ${
      isSubmitting
        ? "bg-text-muted/60"
        : "hover:bg-primary-accent/80 hover: cursor-pointer"
    }
  `}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
        <div className="w-full flex items-center justify-center gap-2">
          <p>Already have an account?</p>
          <Link className="text-lg text-primary-accent font-bold" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
