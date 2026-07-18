import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../components/Box"
import { Infos } from "../../../../components/Infos";
import styles from './ViewOwnerPage.module.css'
import { SimpleTable, type Column } from "../../../../components/SimpleTable";
import { calculateAge } from "../../../../utils/calculateAge";
import { ActionTable } from "../../../../components/ActionTable";
import { EyeIcon, PenIcon, Trash2Icon } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useGetOwnerAndPets } from "../../../../entities/owner/api/hooks/useGetOwnerAndPets";
import { useGetAppointments } from "../../../../entities/owner/api/hooks/useGetAppointments";
import type { Appointment, Pet } from "../../../../entities/owner/types";

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return "---";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const ViewOwnerPage = () => {
  const { id } = useParams({ from: '/_authenticated/owners/$id/' });
  const { data, error, isLoading } = useGetOwnerAndPets(Number(id));
  const { data: dataApt, error: errorAp, isLoading: isLoadingAp } = useGetAppointments(Number(id));

  if (error || !data) {
    return <div>Erro ao buscar usuario e pets</div>
  }

  if (isLoading) {
    return <div>Buscando usuario e pets</div>
  }

  const items = [
     { title: "Nome", info: data.name },
     { title: "Email", info: data.email },
     { title: "Telefone", info: data.phone },
     { title: "CPF", info: data.cpf },
   ];

  const columns: Column<Pet>[] = [
    { header: "Nome", accessor: (row) => row.name },
    { header: "Especie", accessor: (row) => row.species },
    {
      header: "Idade",
      accessor: (row) => (
        <>
          {calculateAge(row.birth_date)}
        </>
      ),
    },
    {
      header: "Status", accessor: (row) => <StatusBadge type="pet" status={row.status} />,
    },
    {
      header: "Ações",
      accessor: (row) => (
        <div style={{ display: "flex", gap: 8 }}>
          <ActionTable
            icon={EyeIcon}
            label="Visualizar"
            href={`/pets/${row.id}`}
          />
          <ActionTable
            icon={PenIcon}
            label="Editar"
            href={`/pets/${row.id}/edit`}
          />
          <ActionTable
            icon={Trash2Icon}
            label="Excluir"
            variant="danger"
            onClick={() => {}}
            confirm={{
              title: `Excluir ${row.name}?`,
              description: "Essa ação não pode ser desfeita.",
            }}
          />
        </div>
      )
    }
  ];

  const appointmentsColumns: Column<Appointment>[] = [
      { header: "Data", accessor: (row) => formatDateTime(row.scheduled_at) },
      { header: "Pet", accessor: (row) => row.pet_name },
      { header: "Veterinário", accessor: (row) => row.vet_name },
      { header: "Motivo", accessor: (row) => row.reason },
      {
        header: "Status", accessor: (row) => <StatusBadge type="appointment" status={row.status} />,
      },
      {
        header: "Ações",
        accessor: (row) => (
          <ActionTable
            icon={EyeIcon}
            label="Visualizar"
            href={`/appointments/${row.appointment_id}`}
          />
        ),
      },
    ];

    const financialColumns: Column<Appointment>[] = [
      { header: "Data", accessor: (row) => formatDateTime(row.scheduled_at) },
      { header: "Pet", accessor: (row) => row.pet_name },
      { header: "Valor", accessor: (row) => formatCurrency(row.payment_value) },
      {
        header: "Método",
        accessor: (row) => row.payment_method ?? "---",
      },
      {
        header: "Status",
        accessor: (row) =>
          row.payment_status ? (
            <StatusBadge type="payment" status={row.payment_status} />
          ) : (
            "---"
          ),
      },
    ];


    const financialData = (dataApt ?? []).filter((apt) => apt.payment_value !== undefined);

  return (
    <section>
      <div>
        {/*aqui vao ficar os botoes de editar e excluir*/}
      </div>
      <div className={styles.boxs}>
        <Box className={styles.info}>
          <h4>Informações</h4>
          <Infos items={items} />
        </Box>
        <div className={styles.tables}>
          <Box>
            <h4 className={styles.boxTitle}>Pets do tutor</h4>
            <SimpleTable
              columns={columns}
              data={data.pets}
              getRowKey={(row) => row.id}
            />
          </Box>
          <Box>
            <h4 className={styles.boxTitle}>Últimas consultas</h4>
            {isLoadingAp ? (
                         <p>Buscando consultas...</p>
                       ) : errorAp ? (
                         <p>Erro ao buscar consultas.</p>
                       ) : (
                         <SimpleTable
                           columns={appointmentsColumns}
                           data={dataApt ?? []}
                           getRowKey={(row) => row.appointment_id}
                         />
                       )}
          </Box>
          <Box>
            <h4 className={styles.boxTitle}>Histórico financeiro</h4>
            {isLoadingAp ? (
                          <p>Buscando histórico...</p>
                        ) : errorAp ? (
                          <p>Erro ao buscar histórico.</p>
                        ) : (
                          <SimpleTable
                            columns={financialColumns}
                            data={financialData}
                            getRowKey={(row) => row.appointment_id}
                          />
                        )}
          </Box>
        </div>
      </div>
    </section>
  )
}
