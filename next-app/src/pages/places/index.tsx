"use client";
import { DataTable } from "../../components/places/data-table";
import { columns } from "../../components/places/places";

import { useData } from "@/src/lib/DataProvider";

export default function Places() {

  const { places } = useData();

  return (
        <div className="bg-background grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:h-screen md:h-full sm:h-full">
          <div className="col-span-4 text-text text-3xl">
            {places ? <DataTable columns={columns} data={places} /> : <p>Loading...</p>}
          </div>
        </div>
  );
}
