import styles from "./IntroPage.module.css";

type IntroPageProps = {
  title: string;
  subtitle: string;
};

export const IntroPage = ({ title, subtitle }: IntroPageProps) => {
  const data = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <p>
        {subtitle} - {data}
      </p>
    </div>
  );
};
