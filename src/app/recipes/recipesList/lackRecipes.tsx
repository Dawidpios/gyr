import Image from "next/image";
import Link from "next/link";

const LackRecipes = () => {
  return ( 
  <div>
    <Image src="/recipes/cookBook.png" alt="No recipes" width={400} height={400} className="mx-auto my-8" />
    <div className="text-muted-foreground text-center font-bold">
      No recipes yet. Add your first recipe!
    </div>
    <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mx-auto block hover:cursor-pointer">
      <Link href="/recipes/add-recipie">
        Add your first recipe!
      </Link>
    </button>
  </div> );
}
 
export default LackRecipes;