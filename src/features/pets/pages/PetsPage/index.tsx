
import { Box } from '../../../../components/Box';
import { ButtonLink } from '../../../../components/form/ButtonLink';
import styles from './PetsPage.module.css';
import {type  ColumnDef } from '@tanstack/react-table';
import { calculateAge } from '../../../../utils/calculateAge';
import { useState } from 'react';
import { useDebouncedValue } from '../../../../utils/hooks/useDebouncedValue';
import { AdvancedTable } from '../../../../components/AdvancedTable';
import { ActionTable } from '../../../../components/ActionTable';
import { EyeIcon, PenIcon } from 'lucide-react';
import { StatusBadge } from '../../../owners/components/StatusBadge';
import type { PetTable } from '../../../../entities/pet/types';
import { useGetPets } from '../../../../entities/pet/api/hooks/useGetPets';
const PAGE_SIZE = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<PetTable, any>[] = [
  { accessorKey: "name", header: "NOME" },
  { accessorKey: "species", header: "ESPECIE" },
  { accessorKey: "breed", header: "RAÇA" },
  { accessorKey: "gender", header: "M/F" },
  {
    accessorKey: "weight",
    header: "PESO",
    cell: ({row}) => (
      <>
        <p>
          {row.original.weight} Kg
        </p>
      </>
    ),
  },
  {
    accessorKey: "birth_date",
    header: "Idade",
    cell: ({row}) => (
      <>
        {calculateAge(row.original.birth_date)}
      </>
    ),
  },
  {
    accessorKey: "is_neutered",
    header: "CASTRADO",
    cell: ({row}) => (
      <>
        <p>{row.original.is_neutered === 1 ? "sim" : "não"}</p>
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <StatusBadge type="pet" status={row.original.status} />
    ),
  },
  { accessorKey: "owner_phone", header: "TELEFONE DO TUTOR" },
  { accessorKey: "owner_name", header: "NOME DO TUTOR" },
  {
    id: "actions",
    header: "AÇÕES",
    cell: ({ row }) => (
      <div style={{ display: "flex", gap: 8 }}>
        <ActionTable
          icon={EyeIcon}
          label="Visualizar"
          href={`/pets/${row.original.id}/`}
        />
        <ActionTable
          icon={PenIcon}
          label="Editar"
          href={`/pets/${row.original.id}/edit`}
        />
      </div>
    ),
  },
]

export const PetsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [pageIndex, setPageIndex] = useState(0);
  const { data: response } = useGetPets(debouncedSearch, pageIndex + 1,);

  if (!response) return <div>Erro ao carregar pets</div>;

  return (
    <section className={styles.container}>
      <ButtonLink variant="success" href="/pets/create">
        Novo Pet
      </ButtonLink>
      <Box>
        <AdvancedTable
          columns={columns}
          data={response.data}
          searchPlaceholder="Buscar por nome, nome do dono, raça..."
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
