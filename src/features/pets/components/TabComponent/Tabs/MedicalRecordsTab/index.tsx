import { useParams } from "@tanstack/react-router"
import { ButtonLink } from "../../../../../../components/form/ButtonLink"
import { SimpleTable, type Column } from "../../../../../../components/SimpleTable"
import type { PetMedicalHistory } from "../../../../../../entities/pet/types"
import styles from './MedicalRecordsTab.module.css'
import { useGetPetMedicalHistory } from "../../../../../../entities/pet/api/hooks/useGetPetMedicalHistory"

export const MedicalRecordsTab = () => {
  const {id} = useParams({from: '/_authenticated/pets/$id/'})
  const { data } = useGetPetMedicalHistory(Number(id));

  const columns: Column<PetMedicalHistory>[] = [
    {header: "Data", accessor: (row) => row.scheduled_at},
    {header: "Motivo", accessor: (row) => row.reason},
    {header: "Tutor", accessor: (row) => row.owner_name},
    {header: "Veterinario", accessor: (row) => row.vet_name},
    {header: "Sintomas", accessor: (row) => row.symptoms},
    {header: "Diagnostico", accessor: (row) => row.diagnosis},
    {header: "Obvservações", accessor: (row) => row.observations},
  ]


  if (!data) return <p>Prontuarios não encontradas.</p>

  return (
    <section className={styles.containerMr}>
      <div className={styles.headerMr}>
        <h4>Prontuarios</h4>
        <ButtonLink href="/" variant="success">Novo prontuario</ButtonLink>
      </div>
      <SimpleTable
        columns={columns}
        data={data}
        getRowKey={(row) => row.medical_record_id}
      />
    </section>
  )
}
