import { Box } from "../../../../components/Box"
import { CreateOwnerForm } from "../../components/CreateOwnerForm"
import styles from './CreateOwnerPage.module.css'

export const CreateOwnerPage = () => {
  return (
    <section>
      <Box className={styles.container}>
        <h4>DADOS PESSOAIS</h4>
        <CreateOwnerForm />
      </Box>
    </section>
  )
}
