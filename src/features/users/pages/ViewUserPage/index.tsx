import { useParams } from "@tanstack/react-router";
import { useGetUser } from "../../../../entities/user/api/hooks/useGetUser";
import { Box } from "../../../../components/Box";
import { Infos } from "../../../../components/Infos";
import styles from './ViewUserPage.module.css'

export const ViewUserPage = () => {
  const { id } = useParams({ from: '/_authenticated/users/$id/' });
  const { data, error } = useGetUser(Number(id));

  if (error || !data) {
    return <div>Erro ao buscar usuario.</div>
  }

  const items = [
     { title: "Nome", info: data.name },
     { title: "Email", info: data.email },
     { title: "Criado em", info: data.created_at },
     { title: "Atualizado em", info: data.updated_at },
   ];

  const vetItems = [
    { title: "CRMV", info: data.crmv },
    { title: "Especialidade", info: data.specialty },
  ];

  const display = [
    ...items,
    ...(data.role === "veterinarian" ? vetItems : []),
  ];

  return (
    <section>
      <Box className={styles.info}>
        <h4>Informações de usuario</h4>
        <Infos items={display} />
      </Box>
    </section>
  )
}
