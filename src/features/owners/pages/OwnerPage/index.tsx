import type { ColumnDef } from "@tanstack/react-table";
import { Box } from "../../../../components/Box";
import type { OwnerTable } from "../../utils/types";
import { ActionTable } from "../../../../components/ActionTable";
import { EyeIcon, PenIcon, Trash2Icon } from "lucide-react";
import { useGetOwners } from "../../hooks/useGetOwners";
import { AdvancedTable } from "../../../../components/AdvancedTable";
import { useState } from "react";
import { useDebouncedValue } from "../../../../utils/hooks/useDebouncedValue";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import styles from "./OwnerPage.module.css";
const PAGE_SIZE = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<OwnerTable, any>[] = [
  {
    accessorKey: "name",
    header: "NOME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "TELEFONE",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    id: "actions",
    header: "AÇÕES",
    cell: ({ row }) => (
      <div style={{ display: "flex", gap: 8 }}>
        <ActionTable
          icon={EyeIcon}
          label="Visualizar"
          href={`/owner/${row.original.id}`}
        />
        <ActionTable
          icon={PenIcon}
          label="Editar"
          href={`/owner/${row.original.id}/edit`}
        />
        <ActionTable
          icon={Trash2Icon}
          label="Excluir"
          variant="danger"
          onClick={() => {}}
          confirm={{
            title: `Excluir ${row.original.name}?`,
            description: "Essa ação não pode ser desfeita.",
          }}
        />
      </div>
    ),
  },
];

export const OwnerPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [pageIndex, setPageIndex] = useState(0);

  const { data: response } = useGetOwners(debouncedSearch, pageIndex + 1);

  if (!response) return <div>Erro ao carregar owners</div>;
  return (
    <section className={styles.container}>
      <ButtonLink variant="success" href="/owners/create">
        Novo tutor
      </ButtonLink>
      <Box>
        <AdvancedTable
          columns={columns}
          data={response.data}
          searchPlaceholder="Buscar por nome, email ou CPF..."
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
  );
};
