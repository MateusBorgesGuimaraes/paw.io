import { Logo } from "../../../../components/Logo";
import { PawPrintIcon, ShieldCheckIcon, SyringeIcon } from "lucide-react";
import styles from "./LoginPage.module.css";
import { LoginForm } from "../../components/LoginForm";

export function LoginPage() {
  const data = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section>
      <header className={styles.header}>
        <Logo />
        <p className={styles.secondary}>Login - {data}</p>
      </header>

      <div className={styles.loginFormContainer}>
        <div className={styles.box}>
          <div className={styles.infos}>
            <div className={styles.infosTop}>
              <div className={styles.icon}>
                <PawPrintIcon />
              </div>
              <Logo color="white" />
            </div>

            <div className={styles.infosMiddle}>
              <h1 className={styles.title}>Gestão veterinária moderna</h1>
              <p className={styles.subTitle}>
                Simplifique consultas, vacinas e prontuários em um só lugar.
              </p>
            </div>

            <div className={styles.infosBottom}>
              <div className={styles.listItem}>
                <div className={styles.icon}>
                  <PawPrintIcon />
                </div>
                <div className={styles.listContent}>
                  <h4>Agenda integrada</h4>
                  <p>Consultas e retornos em um clique</p>
                </div>
              </div>

              <div className={styles.listItem}>
                <div className={styles.icon}>
                  <ShieldCheckIcon />
                </div>
                <div className={styles.listContent}>
                  <h4>Prontuário digital</h4>
                  <p>Histórico completo de cada paciente</p>
                </div>
              </div>

              <div className={styles.listItem}>
                <div className={styles.icon}>
                  <SyringeIcon />
                </div>
                <div className={styles.listContent}>
                  <h4>Controle de vacinas</h4>
                  <p>Lembretes automáticos de reforço</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <h2>Bem-vindo de volta</h2>
            <p className={styles.subT}>Entre com sua conta para continuar</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
