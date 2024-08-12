
import { DataTable } from "../../components/places/data-table";
import { Place, columns } from "../../components/places/places";

function getData(): Place[] {
  return [

    {
      PlaceID: "1",
      Address: "123 Main St",
      PlaceName: "Main St",
      Latitude: 123.456,
      Longitude: 123.456,
      Rating: 5,
      Url: "https://google.com",
      Types: ["Restaurant"],
      Prompt: "What's your favorite dish?",
    },
    {
      PlaceID: "2",
      Address: "456 Elm St",
      PlaceName: "Elm St",
      Latitude: 123.456,
      Longitude: 123.456,
      Rating: 4,
      Url: "https://google.com",
      Types: ["Coffee Shop"],
      Prompt: "What's your favorite drink?",
    },
    {
      PlaceID: "3",
      Address: "789 Oak St",
      PlaceName: "Oak St",
      Latitude: 123.456,
      Longitude: 123.456,
      Rating: 3,
      Url: "https://google.com",
      Types: ["Bar"],
      Prompt: "What's your favorite cocktail?",
    },
  ]
}

type SearchProps = {
  data: Place[];
}

export default function Places({ data }: SearchProps) {
  const dummy = getData()
  return (
        <div className="bg-background h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <div className=" col-span-4 ">
            {dummy ? <DataTable columns={columns} data={dummy} /> : <p>Loading...</p>}
          </div>
        </div>
  );
}
