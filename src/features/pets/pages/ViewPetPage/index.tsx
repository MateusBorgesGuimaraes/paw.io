import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../components/Box"
import { TabComponent } from "../../components/TabComponent"
import styles from './ViewPetPage.module.css'
import { Badge } from "../../../../components/Badge"
import { calculateAge } from "../../../../utils/calculateAge"
import { ButtonLink } from "../../../../components/form/ButtonLink"
import { useGetPet } from "../../../../entities/pet/api/hooks/useGetPet"

export const ViewPetPage = () => {
  const {id} = useParams({from: '/_authenticated/pets/$id/'})
  const { data } = useGetPet(Number(id));
  if (!data) {
    return <p>Pet não encontrado</p>
  }
  const statusVariant = {
    active: "primary",
    inactive: "warning",
    deceased: "danger",
  } as const;

  const statusTranslate = {
    active: "ativo",
    inactive: "inativo",
    deceased: "falecido",
  } as const;
  return (
    <section className={styles.viewContainer}>
      <ButtonLink className={styles.button} href={`/pets/${id}/edit`}>Editar</ButtonLink>
      <Box>
        <div>
          <div className={styles.header}>
            <div>
              <div className={styles.petNameBox}>
                <p className={styles.petName}>{data.name}</p>
                <Badge variant={statusVariant[data.status]}>{statusTranslate[data.status]}</Badge>
              </div>
              <div className={styles.detailsPet}>
                <span>{data.breed}</span>
                <span>·</span>
                <span>{data.gender === 'M' ? 'Macho' : 'Femea'}</span>
                <span>·</span>
                <span>{data.is_neutered === 1 ? 'Castrado(a)' : 'Não Castrado(a)'}</span>
              </div>
              </div>
            <Badge variant={'success'}>{data.owner_name}</Badge>
          </div>

          <div className={styles.footer}>
            <div>
              <h4>Idade</h4>
              <p>{calculateAge(data.birth_date)}</p>
            </div>

            <div>
              <h4>Peso</h4>
              <p>{data.weight} kg</p>
            </div>

            <div>
              <h4>Nascimento</h4>
              <p>{data.birth_date}</p>
            </div>

            <div>
              <h4>Especies</h4>
              <p>{data.species}</p>
            </div>
            { data.microchip &&
              <div>
                <h4>Microchip</h4>
                <p>{data.microchip}</p>
              </div>
            }
          </div>
        </div>
      </Box>
      <Box>
        <TabComponent />
      </Box>
    </section>
  )
}
