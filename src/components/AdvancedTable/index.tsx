import { useState } from "react";
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./AdvancedTable.module.css";

export type { ColumnDef };

interface ManualSearchProps {
  value: string;
  onChange: (value: string) => void;
}

interface ManualPaginationProps {
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;

  total: number;
}

export interface SelectFilterOption {
  label: string;
  value: string;
}

export interface SelectFilter {
  id: string;

  label: string;

  placeholder?: string;
  options: SelectFilterOption[];

  value: string;
  onChange: (value: string) => void;
}

interface AdvancedTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  searchPlaceholder?: string;
  emptyMessage?: string;

  pageSize?: number;

  search?: ManualSearchProps;
  pagination?: ManualPaginationProps;

  filters?: SelectFilter[];
}

export function AdvancedTable<T>({
  columns,
  data,
  searchPlaceholder = "Buscar...",
  pageSize = 10,
  emptyMessage = "Nenhum resultado encontrado.",
  search,
  pagination,
  filters,
}: AdvancedTableProps<T>) {
  const isManualSearch = search !== undefined;
  const isManualPagination = pagination !== undefined;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize,
    },
  );

  // --- INSTÂNCIA DA TABELA ---
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      globalFilter: isManualSearch ? search.value : internalGlobalFilter,
      pagination: isManualPagination
        ? { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }
        : internalPagination,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: isManualSearch
      ? search.onChange
      : setInternalGlobalFilter,

    onPaginationChange: isManualPagination
      ? (updater) => {
          const current = {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          };
          const next =
            typeof updater === "function" ? updater(current) : updater;
          pagination.onPageChange(next.pageIndex);
        }
      : setInternalPagination,

    manualFiltering: isManualSearch,
    manualPagination: isManualPagination,

    pageCount: isManualPagination
      ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
      : undefined,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    ...(!isManualSearch && { getFilteredRowModel: getFilteredRowModel() }),
    ...(!isManualPagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
  });

  const searchValue = isManualSearch ? search.value : internalGlobalFilter;
  const onSearchChange = isManualSearch
    ? search.onChange
    : setInternalGlobalFilter;

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const currentPageLabel = table.getState().pagination.pageIndex + 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        {filters && filters.length > 0 && (
          <div className={styles.filtersGroup}>
            {filters.map((filter) => (
              <select
                key={filter.id}
                className={styles.filterSelect}
                value={filter.value}
                onChange={(event) => filter.onChange(event.target.value)}
                aria-label={filter.label}
              >
                <option value="">
                  {filter.placeholder ?? `Todos: ${filter.label}`}
                </option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.headerRow}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.headerCell}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort() ? styles.sortableHeader : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td className={styles.emptyState} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          )}

          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <span>
          Página {currentPageLabel} de {table.getPageCount()}
        </span>
        <div>
          <button
            className={styles.pageButton}
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>

          <button
            className={styles.pageButton}
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
