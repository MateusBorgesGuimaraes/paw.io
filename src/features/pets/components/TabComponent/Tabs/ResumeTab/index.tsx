import { useParams } from "@tanstack/react-router"
import { useGetPet } from "../../../../../../entities/pet/api/hooks/useGetPet";
import { Box } from "../../../../../../components/Box";
import { Infos } from "../../../../../../components/Infos";
import { useGetPetAppointments } from "../../../../../../entities/pet/api/hooks/useGetPetAppointments";
import { useGetPetVaccines } from "../../../../../../entities/vaccine/api/hooks/useGetPetVaccines";
import { Badge } from "../../../../../../components/Badge";
import styles from './ResumeTab.module.css'
import { StatusBadge } from "../../../../../../components/StatusBadge";

export const ResumeTab = () => {
  const { id } = useParams({ from: '/_authenticated/pets/$id/' });
  const { data } = useGetPet(Number(id));
  const { data: appointements } = useGetPetAppointments(Number(id));
  const { data: vaccines } = useGetPetVaccines(Number(id));

  if (!data) return <p>Erro ao buscar pet</p>
  if (!appointements) return <p>Erro ao buscar consultas</p>
  if (!vaccines) return <p>Erro ao buscar vacinas</p>

  const lastApt = appointements[appointements.length - 1]

  const nextVaccine = vaccines.length ? [...vaccines].sort((a, b) => a.days_until_next_dose - b.days_until_next_dose)[0] : null;

  const petGenerals = [
     { title: "Nome", info: data.name },
     { title: "Tutor", info: data.owner_name },
     { title: "Raça", info: data.breed },
     { title: "Especie", info: data.species },
     { title: "Sexo", info: data.gender === 'M' ? 'Macho' : 'Femea' },
     { title: "Castrado", info: data.is_neutered === 1? 'Sim': 'Não'},
   ];

  const aptData = [
     { title: "Data", info: lastApt.scheduled_at },
     { title: "Veterinario", info: lastApt.vet_name },
     { title: "Motivo", info: lastApt.reason },
     { title: "Notas", info: lastApt.notes},
     { title: "Status", info: <StatusBadge type="appointment" status={lastApt.status} /> },
   ];

  const vaccineData = nextVaccine ? [
     { title: "Vacina", info: nextVaccine.vaccine_name },
     { title: "Lote", info: nextVaccine.batch },
     { title: "Aplicada em", info: nextVaccine.application_date },
     { title: "Próxima dose", info: nextVaccine.next_dose },
     {
       title: "Situação",
       info: (
         <Badge variant={nextVaccine.days_until_next_dose < 0 ? "danger" : "success"}>
           {nextVaccine.days_until_next_dose < 0 ? "Vencida" : "Em dia"}
         </Badge>
       ),
     },
   ] : null;

  return (
    <section className={styles.resumeContainer}>
      <Box>
        <h4>Dados gerais</h4>
        <Infos items={petGenerals} />
      </Box>

      <Box>
        <h4>Ultima consulta</h4>
        <Infos items={aptData} />
      </Box>

      <Box>
        <h4>Vacinação</h4>
          {vaccineData
            ? <Infos items={vaccineData} />
            : <p>Nenhuma vacina registrada.</p>
          }
      </Box>
    </section>
  )
}
