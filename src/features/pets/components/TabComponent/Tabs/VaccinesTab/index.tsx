import { useParams } from "@tanstack/react-router"
import { ButtonLink } from "../../../../../../components/form/ButtonLink"
import { SimpleTable, type Column } from "../../../../../../components/SimpleTable"
import styles from './VaccinesTab.module.css'
import { useGetPetVaccines } from "../../../../../../entities/vaccine/api/hooks/useGetPetVaccines"
import type { PetVaccine } from "../../../../../../entities/vaccine/types"

export const VaccinesTab = () => {
  const {id} = useParams({from: '/_authenticated/pets/$id/'})
  const { data } = useGetPetVaccines(Number(id));

  const columns: Column<PetVaccine>[] = [
    {header: "Nome da vacina", accessor: (row) => row.vaccine_name},
    {header: "Lote", accessor: (row) => row.batch},
    {header: "Data de aplicação", accessor: (row) => row.application_date},
    {header: "Proxima dose", accessor: (row) => row.next_dose},
    {header: "Dias ate a procima dose", accessor: (row) => row.days_until_next_dose},
    { header: "Dias ate a procima dose", accessor: (row) => <p>{Math.floor(row.days_until_next_dose)} dias</p> },
  ]


  if(!data) return <p>Vacinas não encontradas.</p>
  return (
    <section className={styles.containerVac}>
      <div className={styles.headerVac}>
        <h4>Calendario vacinal</h4>
        <ButtonLink href="/" variant="success">Registrar vacina</ButtonLink>
      </div>
      <SimpleTable
        columns={columns}
        data={data}
        getRowKey={(row) => row.vaccine_id}
      />
    </section>
  )
}
