import * as Tabs from "@radix-ui/react-tabs";
import styles from "./TabComponent.module.css";

export const TabComponent = () => {
  return (
    <Tabs.Root defaultValue="resume">
      <Tabs.List className={styles.tabsList}>
        <Tabs.Trigger className={styles.tabsTrigger} value="resume">
          Resumo
        </Tabs.Trigger>

        <Tabs.Trigger className={styles.tabsTrigger} value="appointments">
          Consultas
        </Tabs.Trigger>

        <Tabs.Trigger className={styles.tabsTrigger} value="medicalRecords">
          Prontuários
        </Tabs.Trigger>

        <Tabs.Trigger className={styles.tabsTrigger} value="vaccines">
          Vacinas
        </Tabs.Trigger>

        <Tabs.Trigger className={styles.tabsTrigger} value="exams">
          Exames
        </Tabs.Trigger>

        <Tabs.Trigger className={styles.tabsTrigger} value="treatments">
          Tratamentos
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="resume">
        <p>Resumo box.</p>
      </Tabs.Content>

      <Tabs.Content value="appointments">
        <p>Consultas Box.</p>
      </Tabs.Content>

      <Tabs.Content value="medicalRecords">
        <p>Prontuarios box.</p>
      </Tabs.Content>

      <Tabs.Content value="vaccines">
        <p>Vacinas box.</p>
      </Tabs.Content>

      <Tabs.Content value="exams">
        <p>Exanes box.</p>
      </Tabs.Content>

      <Tabs.Content value="treatments">
        <p>Tratamentos box.</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};
