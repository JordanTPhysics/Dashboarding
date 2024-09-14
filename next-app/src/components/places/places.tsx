"use client"

import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export type Place = {
  PlaceID: string
  Address: string
  PlaceName: string
  Latitude: number
  Longitude: number
  Rating: number
  Url: string
  Types: string
  Prompt: string
  Phone: string
}

export const CountPlaceType = (places: Place[]) => {
  const placeType: { [key: string]: number } = {};
  places.forEach((place) => {
      place.Types.split(",").forEach((type) => {
          let s = type.trim();
          if (s === "") return;
          if (placeType[s]) {
              placeType[s] += 1;
          } else {
              placeType[s] = 1;
          }
      });
  }
  );
  return placeType;
}
export const GroupByRating = (places: Place[]) => {
  const RankedRating: { [key: string]: number } = {
      "Great! (4-5)": 0,
      "Good (3-4)": 0,
      "Bad (0-3)": 0,
      "Unrated": 0
  };
  places.forEach((place) => {
      if (place.Rating > 4) {

          RankedRating["Great! (4-5)"] += 1;
      } else if (place.Rating > 3) {
          RankedRating["Good (3-4)"] += 1;
      }
      else if (place.Rating >= 0) {
          RankedRating["Bad (0-3)"] += 1;
      } else {
          RankedRating["Unrated"] += 1;
      }
  });
  return RankedRating;
}

export const columns: ColumnDef<Place>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Link href={""} > Name</Link>
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    },
    accessorKey: "PlaceName",
    cell: ({ cell }) => {
      return (
        <Link href={`/places/${cell.row.original.PlaceID}`} rel="noreferrer">
          {cell.row.original.PlaceName} </Link>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      )

    }, accessorKey: "Address"
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }, accessorKey: "Rating"
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Types
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }
    , accessorKey: "Types"
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prompt
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }, accessorKey: "Prompt"
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }, accessorKey: "Url",
    cell: ({ cell }) => {
      return (
        <a href={cell.row.original.Url} target="_blank" rel="noreferrer" className="decoration-contrast">
          {cell.row.original.Url} </a>
      );
    },
  }
  ,
  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }, accessorKey: "Phone"

  },

]
