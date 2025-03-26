import gameboy from "@/assets/images/gameboy.webp";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const randomGame = () => {
    const games = ["allumettes", "blackjack"];
    router.push("/" + games[Math.floor(Math.random() * games.length)]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Big Brain Games</title>
      </Head>
      <Header />

      <main className={styles.content}>
        <section className={styles.textBlock}>
          <div className={styles.texts}>
            <h1 className={styles.textsTitle}>Big Brain Games</h1>
            <span className={styles.textsDescription}>
              Jouez et découvrez nos nombreux mini-jeux contre une IA !
            </span>
          </div>

          <button onClick={randomGame} className={styles.playButton}>
            {" "}
            <FontAwesomeIcon
              className={styles.arrowIcon}
              icon={faCircleArrowRight}
            />{" "}
            <span className={styles.spanButton}>Jouer</span>
          </button>
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
