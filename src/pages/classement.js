import AllumettesClassement from "@/components/AllumettesClassement";
import BlackjackClassement from "@/components/BlackjackClassement";
import Header from "@/components/Header";
import styles from "@/styles/Profil.module.css";
import Head from "next/head";

export default function Profil() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Big Brain Games</title>
      </Head>
      <Header />

      <main className={styles.content}>
        <AllumettesClassement />
        <BlackjackClassement />
      </main>
    </div>
  );
}
