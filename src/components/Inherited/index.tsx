import React from "react";
import styles from "./styles.module.css";

type InheritedProps = {
  from: string;
  href?: string;
  children: React.ReactNode;
};

export default function Inherited({ from, href, children }: InheritedProps) {
  return (
    <details className={styles.inherited}>
      <summary className={styles.summary}>
        <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span>
          Inherited methods from {href ? <a className={styles.titleLink} href={href}>{from}</a> : from}
        </span>
      </summary>
      <div className={styles.content}>
        {children}
      </div>
    </details>
  );
}


