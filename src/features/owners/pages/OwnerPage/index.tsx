import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { EyeIcon, PenIcon, ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { Box } from "../../../../components/Box";
import { ActionTable } from "../../../../components/ActionTable";
import { AdvancedTable } from "../../../../components/AdvancedTable";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { useDebouncedValue } from "../../../../utils/hooks/useDebouncedValue";
import styles from "./OwnerPage.module.css";
import { PermissionGate } from "../../../../components/PermissionGate";
import { useGetOwners } from "../../../../entities/owner/api/hooks/useGetOwners";
import { useToggleOwnerStatus } from "../../../../entities/owner/api/hooks/useToggleOwnerStatus";
import type { OwnerTable } from "../../../../entities/owner/types";

const PAGE_SIZE = 5;

export const OwnerPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [pageIndex, setPageIndex] = useState(0);
  const { data: response } = useGetOwners(debouncedSearch, pageIndex + 1);
  const { mutate: toggleStatus, isPending } = useToggleOwnerStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<OwnerTable, any>[]>(
    () => [
      { accessorKey: "name", header: "NOME" },
      { accessorKey: "email", header: "EMAIL" },
      { accessorKey: "phone", header: "TELEFONE" },
      { accessorKey: "cpf", header: "CPF" },
      {
        id: "actions",
        header: "AÇÕES",
        cell: ({ row }) => (
          <div style={{ display: "flex", gap: 8 }}>
            <ActionTable
              icon={EyeIcon}
              label="Visualizar"
              href={`/owners/${row.original.id}/`}
            />
            <ActionTable
              icon={PenIcon}
              label="Editar"
              href={`/owners/${row.original.id}/edit`}
            />
            <PermissionGate roles={["admin"]}>
            <ActionTable
              icon={row.original.is_active ? ToggleRightIcon : ToggleLeftIcon}
              label={row.original.is_active ? "Desativar" : "Ativar"}
              variant={row.original.is_active ? "danger" : "default"}
              disabled={isPending}
              toggle={{
                checked: row.original.is_active === 1,
                onToggle: () => toggleStatus(row.original.id),
                confirm: (checked) => ({
                  title: checked ? "Desativar tutor?" : "Ativar tutor?",
                  description: checked
                    ? `${row.original.name} será marcado como inativo.`
                    : `${row.original.name} será reativado.`,
                }),
              }}
            />
            </PermissionGate>
          </div>
        ),
      },
    ],
    [toggleStatus, isPending],
  );

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
