import { useState } from "react"
import { useDebouncedValue } from "../../../../utils/hooks/useDebouncedValue"
import { useGetAppointments } from "../../../../entities/appointment/api/hooks/useGetAppointements";
import type { ColumnDef } from "@tanstack/react-table";
import type { AppointmentListItem } from "../../../../entities/appointment/types";
import { StatusBadge } from "../../../../components/StatusBadge";
import styles from './AppointmentsPage.module.css'
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { Box } from "../../../../components/Box";
import { AdvancedTable } from "../../../../components/AdvancedTable";
import { splitDateTime } from "../../../../utils/splitDateTime";
const PAGE_SIZE = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<AppointmentListItem, any>[] = [
  {
    accessorKey: "scheduled_at", header: "DATA/HORÁRIO",
    cell: ({ row }) => (
      <div>
        <p className={styles.dest}>{splitDateTime(row.original.scheduled_at).date}</p>
        <p className={styles.sub}>{splitDateTime(row.original.scheduled_at).time}</p>
      </div>
    ),
  },
  {
    accessorKey: "pet_name", header: "PET",
    cell: ({ row }) => (
      <div>
        <p className={styles.dest}>{row.original.pet_name}</p>
        <p className={styles.sub}>{row.original.breed}</p>
      </div>
    ),
  },
  {accessorKey: "owner_name", header: "TUTOR"},
  {accessorKey: "vet_name", header: "VETERINARIO"},
  {accessorKey: "reason", header: "MOTIVO"},
  {
    accessorKey: "status", header: "MOTIVO",
    cell: ({ row }) => (
      <StatusBadge type="appointment" status={row.original.status} />
    ),
  },
]

export const AppointmentsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [pageIndex, setPageIndex] = useState(0);
  const { data: response } = useGetAppointments(debouncedSearch, pageIndex + 1);

  if (!response) return <div>Erro ao carregar appointments</div>

  return (
    <section className={styles.container}>
      <div>
        <ButtonLink variant="default" href="/pets/create">
          Ver agenda
        </ButtonLink>
        <ButtonLink variant="success" href="/pets/create">
          Agendar consulta
      </ButtonLink>
      </div>
      <Box>
        <AdvancedTable
          columns={columns}
          data={response.data}
          searchPlaceholder="Buscar por pet, ou tutor..."
          search={{
            value: searchInput,
            onChange: (value) => {
              setSearchInput(value);
              setPageIndex(0);
            },
          }}
          pagination={{
            pageIndex,
            pageSize: PAGE_SIZE,
            onPageChange: setPageIndex,
            total: response.total,
          }}
        />
      </Box>
    </section>
  )
}
