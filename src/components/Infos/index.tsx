import type { ReactNode } from 'react';
import styles from './Infos.module.css'

type InfoItem = {
  title: string;
  info: string | number | ReactNode | null | undefined;
};

type InfosProps = {
  items: InfoItem[];
};

export const Infos = ({ items }: InfosProps) => {
  return (
    <div className={styles.infosContainer}>
      {items.map(({ title, info }) => (
        <div className={styles.cell} key={title}>
          <p className={styles.title}>{title}</p>
          <p className={styles.content}>{info ?? '---'}</p>
        </div>
      ))}
    </div>
  )
}
