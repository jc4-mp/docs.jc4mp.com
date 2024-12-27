import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.container}>
      <img src="/img/tornado.webp" alt="JC4 Tornado" className={styles.bgImage} />
      <img src="/img/jc4mp.png" alt="JC4MP Logo" className={styles.logo} />
      <p className={styles.subtitle}>{siteConfig.tagline}</p>
      <div className={styles.buttons}>
        <Link className="button button--secondary button--lg" to="/intro">
          Go to Documentation
        </Link>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
