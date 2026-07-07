import type { ReactNode } from "react";
import styles from "./SimpleTable.module.css";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface SimpleTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
}

export function SimpleTable<T>({
  columns,
  data,
  getRowKey,
}: SimpleTableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          {columns.map((column) => (
            <th key={column.header} className={styles.headerCell}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={getRowKey(row)} className={styles.row}>
            {columns.map((column) => (
              <td
                key={column.header}
                className={`${styles.cell} ${column.className ?? ""}`}
              >
                {column.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
