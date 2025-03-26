import gameboy from "@/assets/images/gameboy.webp";
import FormulaireConnexion from "@/components/FormulaireConnexion";
import Header from "@/components/Header";
import styles from "@/styles/InscriptionConnexion.module.css";
import Image from "next/image";

export default function Inscription() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <section className={styles.inscriptionBlock}>
          <FormulaireConnexion />
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
