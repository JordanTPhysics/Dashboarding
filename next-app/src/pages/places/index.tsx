
import { DataTable } from "../../components/places/data-table";
import { Place, columns } from "../../components/places/places";

export async function getServerSideProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/places');
    const data = await res.json();

    return {
      props: {
        places: data, // Make sure data is resolved and passed correctly
      },
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    return {
      props: {
        places: [],
      },
    };
  }
}

type SearchProps = {
  places: Place[];
}

export default function Places({ places }: SearchProps) {
  return (
        <div className="bg-background grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <div className=" col-span-4 ">
            {places ? <DataTable columns={columns} data={places} /> : <p>Loading...</p>}
          </div>
        </div>
  );
}
