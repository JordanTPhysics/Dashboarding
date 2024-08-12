"use client"

import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

import React from "react"

import { ComboBox } from "../ComboBox"
import { SearchInput } from "../SearchInput"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filterCriteria, setFilterCriteria] = React.useState<ColumnFiltersState>([])
    const [filterCol, setFilterCol] = React.useState<string>("")

    const handleFilter = (value: string) => {
        setFilterCol(value)
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setFilterCriteria,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters: filterCriteria,
        },

    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            <div className="bg-background border-border text-text">
                <ComboBox setValue={handleFilter} value={filterCol} /></div>
            <Input
                className="bg-contrast border-border text-text m-4"
                color="contrast"
                placeholder={`Filter ${filterCol}...`}
                value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(filterCol)?.setFilterValue(event.target.value)
                }
            />
            <div className="rounded-md border-4 border-border bg-contrast col-span-4 ">
                <Table>
                    <TableHeader className="border-border text-text">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className="border-border text-text"
                                            key={header.id} >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className="hover:bg-contrast border-border"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}
