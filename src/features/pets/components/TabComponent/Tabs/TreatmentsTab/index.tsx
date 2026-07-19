import { useParams } from "@tanstack/react-router"
import styles from './TreatmentsTab.module.css'
import { StatusBadge } from "../../../../../../components/StatusBadge";
import { useGetPetTreatmentHistory } from "../../../../../../entities/pet/api/hooks/useGetPetTreatmentHistory";
import type { PetActiveTreatment } from "../../../../../../entities/pet/types";
import { SimpleTable, type Column } from "../../../../../../components/SimpleTable";
import { ButtonLink } from "../../../../../../components/form/ButtonLink";

export const TreatmentsTab = () => {
  const { id } = useParams({ from: '/_authenticated/pets/$id/' });
  const { data } = useGetPetTreatmentHistory(Number(id));

  if (!data) return <p>Erro ao buscar pet</p>

  const columns: Column<PetActiveTreatment>[] = [
    {header: "Prescrição", accessor: (row) => row.description},
    {header: "Veterinario", accessor: (row) => row.vet_name},
    {header: "Tutor", accessor: (row) => row.owner_name},
    {header: "Data de inicio", accessor: (row) => row.start_date},
    {header: "Data de fim", accessor: (row) => row.end_date},
    {header: "Dia da consulta", accessor: (row) => row.consultation_date},
    { header: "Status", accessor: (row) => <StatusBadge status={row.status} type="treatment"/>},
  ]

  return (
    <section className={styles.containerTr}>
      <div className={styles.headerTr}>
        <h4>Tratamentos</h4>
        <ButtonLink href="/" variant="success">Novo tratamento</ButtonLink>
      </div>
      <SimpleTable
        columns={columns}
        data={data}
        getRowKey={(row) => row.treatment_id}
      />
    </section>
  )
}
