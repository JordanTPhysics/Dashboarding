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
    PaginationOptions
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
import { table } from "console"

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
        initialState: {
            pagination: {
                pageSize: 20,
                pageIndex: 0,
            },
        },


    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center mr-4 ml-4">
            <div className="bg-background border-border text-text">
                <ComboBox setValue={handleFilter} value={filterCol} />
            </div>
            <Input
                className="bg-foreground border-border text-text m-4"
                color="contrast"
                placeholder={`Filter ${filterCol}...`}
                value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(filterCol)?.setFilterValue(event.target.value)
                }
            />
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    className="bg-foreground border-border text-text m-4 smooth hover:scale-110 hover:bg-danger"
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    className="bg-foreground border-border text-text m-4 smooth hover:scale-110 hover:bg-success"
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
            <div className="rounded-md border-4 border-border bg-foreground col-span-4 w-[95vw]">
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
                                    className="hover:bg-background border-border text-text"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                            className="max-w-6 overflow-hidden">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext())}
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
