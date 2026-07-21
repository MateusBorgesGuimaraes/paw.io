import { ActionTable } from "../../../../components/ActionTable";
import { PermissionGate } from "../../../../components/PermissionGate";
import { EyeIcon, PenIcon, ToggleLeftIcon, ToggleRightIcon } from "lucide-react";

interface ActionableRow {
  id: number;
  name: string;
  is_active: number;
}

export function UserActions({
  row,
  toggleStatus,
  isPending,
}: {
  row: ActionableRow;
  toggleStatus: (id: number) => void;
  isPending: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <ActionTable
        icon={EyeIcon}
        label="Visualizar"
        href={`/users/${row.id}/`}
      />
      <ActionTable
        icon={PenIcon}
        label="Editar"
        href={`/users/${row.id}/edit`}
      />
      <PermissionGate roles={["admin"]}>
        <ActionTable
          icon={row.is_active ? ToggleRightIcon : ToggleLeftIcon}
          label={row.is_active ? "Desativar" : "Ativar"}
          variant={row.is_active ? "danger" : "default"}
          disabled={isPending}
          toggle={{
            checked: row.is_active === 1,
            onToggle: () => toggleStatus(row.id),
            confirm: (checked) => ({
              title: checked ? "Desativar usuário?" : "Ativar usuário?",
              description: checked
                ? `${row.name} será marcado como inativo.`
                : `${row.name} será reativado.`,
            }),
          }}
        />
      </PermissionGate>
    </div>
  );
}
