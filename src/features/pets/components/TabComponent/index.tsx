import * as Tabs from "@radix-ui/react-tabs";
import styles from "./TabComponent.module.css";
import { ResumeTab } from "./Tabs/ResumeTab";
import { AppointmentsTab } from "./Tabs/AppointmentsTab";
import { MedicalRecordsTab } from "./Tabs/MedicalRecordsTab";
import { VaccinesTab } from "./Tabs/VaccinesTab";
import { ExamsTab } from "./Tabs/ExamsTab";
import { TreatmentsTab } from "./Tabs/TreatmentsTab";

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

      <Tabs.Content className={styles.tabsContent} value="resume">
        <ResumeTab />
      </Tabs.Content>

      <Tabs.Content className={styles.tabsContent} value="appointments">
        <AppointmentsTab />
      </Tabs.Content>

      <Tabs.Content className={styles.tabsContent} value="medicalRecords">
        <MedicalRecordsTab />
      </Tabs.Content>

      <Tabs.Content className={styles.tabsContent} value="vaccines">
        <VaccinesTab />
      </Tabs.Content>

      <Tabs.Content className={styles.tabsContent} value="exams">
        <ExamsTab />
      </Tabs.Content>

      <Tabs.Content className={styles.tabsContent} value="treatments">
        <TreatmentsTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};
