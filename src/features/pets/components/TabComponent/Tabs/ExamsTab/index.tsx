import { useParams } from "@tanstack/react-router"
import { ButtonLink } from "../../../../../../components/form/ButtonLink"
import { SimpleTable, type Column } from "../../../../../../components/SimpleTable"
import styles from './ExamsTab.module.css'
import { useGetPetExams } from "../../../../../../entities/pet/api/hooks/useGetPetExams"
import type { PetExam } from "../../../../../../entities/pet/types"
import { StatusBadge } from "../../../../../../components/StatusBadge"

export const ExamsTab = () => {
  const {id} = useParams({from: '/_authenticated/pets/$id/'})
  const { data } = useGetPetExams(Number(id));

  const columns: Column<PetExam>[] = [
    {header: "Exame", accessor: (row) => row.exam_name},
    {header: "Solicitado", accessor: (row) => row.request_date},
    {header: "Dia da consulta", accessor: (row) => row.consultation_date},
    {header: "Veterinario", accessor: (row) => row.vet_name},
    {header: "Resultado", accessor: (row) => row.result},
    {header: "Diagnostico", accessor: (row) => row.diagnosis},
    { header: "Status", accessor: (row) => <StatusBadge type="exam" status={row.exam_status} />},
  ]


  if(!data) return <p>Exames não encontrados.</p>
  return (
    <section className={styles.containerExm}>
      <div className={styles.headerExm}>
        <h4>Exames realizados</h4>
        <ButtonLink href="/" variant="success">Solicitar exame</ButtonLink>
      </div>
      <SimpleTable
        columns={columns}
        data={data}
        getRowKey={(row) => row.exam_id}
      />
    </section>
  )
}
