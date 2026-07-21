import type { ColumnDef, Row } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Box } from "../../../../components/Box";
import { AdvancedTable } from "../../../../components/AdvancedTable";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { useDebouncedValue } from "../../../../utils/hooks/useDebouncedValue";
import { useGetUsers } from "../../../../entities/user/api/hooks/useGetUsers";
import { useToggleUserStatus } from "../../../../entities/user/api/hooks/useToggleUserStatus";
import type { UserTable, VeterinarianTable } from "../../../../entities/user/types";;
import styles from "./UserPage.module.css";
import { useGetVeterinarians } from "../../../../entities/user/api/hooks/useGetVeterinarians";
import { UserActions } from "../../components/UserActions";

const PAGE_SIZE = 5;

const ROLE_LABEL: Record<UserTable["role"], string> = {
  admin: "Administrador",
  receptionist: "Recepcionista",
  veterinarian: "Veterinário",
};

type ViewMode = "all" | "veterinarians";

export const UserPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [pageIndex, setPageIndex] = useState(0);

  const usersQuery = useGetUsers(debouncedSearch, pageIndex + 1);
  const vetsQuery = useGetVeterinarians(debouncedSearch, pageIndex + 1);

  const { mutate: toggleStatus, isPending } = useToggleUserStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userColumns = useMemo<ColumnDef<UserTable, any>[]>(
    () => [
      { accessorKey: "name", header: "NOME" },
      { accessorKey: "email", header: "EMAIL" },
      {
        accessorKey: "role",
        header: "PAPEL",
        cell: ({ getValue }) => ROLE_LABEL[getValue() as UserTable["role"]],
      },
      {
        id: "actions",
        header: "AÇÕES",
        cell: ({ row }: { row: Row<UserTable> }) => (
          <UserActions
            row={row.original}
            toggleStatus={toggleStatus}
            isPending={isPending}
          />
        ),
      },
    ],
    [toggleStatus, isPending],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vetColumns = useMemo<ColumnDef<VeterinarianTable, any>[]>(
    () => [
      { accessorKey: "name", header: "NOME" },
      { accessorKey: "email", header: "EMAIL" },
      { accessorKey: "crmv", header: "CRMV" },
      { accessorKey: "specialty", header: "ESPECIALIDADE" },
      {
        id: "actions",
        header: "AÇÕES",
        cell: ({ row }: { row: Row<VeterinarianTable> }) => (
          <UserActions
            row={row.original}
            toggleStatus={toggleStatus}
            isPending={isPending}
          />
        ),
      },
    ],
    [toggleStatus, isPending],
  );

  function changeView(mode: ViewMode) {
    setViewMode(mode);
    setPageIndex(0);
    setSearchInput("");
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "all"}
            className={viewMode === "all" ? styles.tabActive : styles.tab}
            onClick={() => changeView("all")}
          >
            Todos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "veterinarians"}
            className={
              viewMode === "veterinarians" ? styles.tabActive : styles.tab
            }
            onClick={() => changeView("veterinarians")}
          >
            Veterinários
          </button>
        </div>
        <ButtonLink variant="success" href="/users/create">
          Novo usuário
        </ButtonLink>
      </div>
      <Box>
        {viewMode === "all" ? (
          !usersQuery.data ? (
            <div>Erro ao carregar usuários</div>
          ) : (
            <AdvancedTable
              columns={userColumns}
              data={usersQuery.data.data}
              searchPlaceholder="Buscar por nome ou email..."
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
                total: usersQuery.data.total,
              }}
            />
          )
        ) : !vetsQuery.data ? (
          <div>Erro ao carregar veterinários</div>
        ) : (
          <AdvancedTable
            columns={vetColumns}
            data={vetsQuery.data.data}
            searchPlaceholder="Buscar por nome, email ou CRMV..."
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
              total: vetsQuery.data.total,
            }}
          />
        )}
      </Box>
    </section>
  );
};
