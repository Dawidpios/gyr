import { Search } from "lucide-react";
import { Input } from "@components/components/ui/input";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  return (
    <div className="relative mb-4 w-full sm:max-w-1/2">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search ingredients or recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-3 text-lg"
      />
    </div>
  );
};

export default SearchBar;
