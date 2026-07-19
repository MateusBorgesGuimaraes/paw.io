import { useParams } from "@tanstack/react-router"
import { ButtonLink } from "../../../../../../components/form/ButtonLink"
import { SimpleTable, type Column } from "../../../../../../components/SimpleTable"
import { useGetPetAppointments } from "../../../../../../entities/pet/api/hooks/useGetPetAppointments"
import type { PetAppointment } from "../../../../../../entities/pet/types"
import styles from './AppointmentsTab.module.css'
import { StatusBadge } from "../../../../../../components/StatusBadge"

export const AppointmentsTab = () => {
  const {id} = useParams({from: '/_authenticated/pets/$id/'})
  const { data } = useGetPetAppointments(Number(id));

  const columns: Column<PetAppointment>[] = [
    {header: "Data", accessor: (row) => row.scheduled_at},
    {header: "Veterinario", accessor: (row) => row.vet_name},
    {header: "Motivo", accessor: (row) => row.reason},
    {header: "Observações", accessor: (row) => row.notes},
    {header: "Status", accessor: (row) => <StatusBadge type="appointment" status={row.status} />},
  ]


  if(!data) return <p>Consultas não encontradas.</p>
  return (
    <section className={styles.containerApt}>
      <div className={styles.headerApt}>
        <h4>Historico de consultas</h4>
        <ButtonLink href="/" variant="success">Nova consulta</ButtonLink>
      </div>
      <SimpleTable
        columns={columns}
        data={data}
        getRowKey={(row) => row.appointment_id}
      />
    </section>
  )
}
