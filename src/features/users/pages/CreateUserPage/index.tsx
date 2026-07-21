import { Box } from "../../../../components/Box"
import { CreateUserForm } from "../../components/CreateUserForm"
import styles from "./CreateUserPage.module.css"

export const CreateUserPage = () => {
  return (
    <section>
      <Box className={styles.container}>
        <h4>DADOS DO USUÁRIO</h4>
        <CreateUserForm />
      </Box>
    </section>
  )
}
