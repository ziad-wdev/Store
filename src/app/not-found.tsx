import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex-center container flex-1 flex-col py-20">
      <h2 className="text-3xl font-bold">Page Not Found</h2>
      <p className="mb-4 text-lg font-medium">Could not find requested resource</p>
      <Link href="/" className="text-lg font-medium underline transition-all hover:scale-105 hover:underline-offset-4">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
