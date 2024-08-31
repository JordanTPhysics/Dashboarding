"use client"

import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"

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

export const columns: ColumnDef<Place>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          className="text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      )

    }, accessorKey: "PlaceName"
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

    }, accessorKey: "Url"
  },
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
