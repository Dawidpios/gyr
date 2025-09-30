import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col p-4 gap-10 w-full h-dvh justify-center items-center text-center">
      <h1 className="text-white text-4xl">404 Not found</h1>
      <p className="text-white">
        Oops, the page you are looking for does not exist.
      </p>
      <button className="bg-green text-white p-3 rounded-lg text-black font-bold">
        <Link href="/">Go back home</Link>
      </button>
    </div>
  );
};

export default NotFound;