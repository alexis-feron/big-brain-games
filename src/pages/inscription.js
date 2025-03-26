import gameboy from "@/assets/images/gameboy.webp";
import FormulaireInscription from "@/components/FormulaireInscription";
import Header from "@/components/Header";
import styles from "@/styles/InscriptionConnexion.module.css";
import Head from "next/head";
import Image from "next/image";

export default function Inscription() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Big Brain Games</title>
      </Head>
      <Header />

      <main className={styles.content}>
        <section className={styles.inscriptionBlock}>
          <FormulaireInscription />
        </section>

        <section className={styles.imageBlock}>
          <Image
            className={styles.image}
            src={gameboy}
            alt="index.js (Home) | imageBlock | image not displaying"
          ></Image>
        </section>
      </main>
    </div>
  );
}
