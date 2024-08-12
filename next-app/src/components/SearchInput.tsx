import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type Props = {
    placeholder?: string;
    updateValue: Function
    applyFilter: Function
    };

    export function SearchInput({ placeholder, updateValue, applyFilter }: Props) {
    return (
        <div className="border rounded-lg flex items-center justify-between">
        <Input
            type="text"
            onChange={(e) => updateValue(e)}
            placeholder={placeholder || "Search..."}
        />
        <Button variant="secondary" size="icon">
            <Search onClick={applyFilter()}/>
            <span className="sr-only">Search</span>
        </Button>
        </div>
    );
    }