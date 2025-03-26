import AllumettesStatsBlock from "@/components/AllumettesStatsBlock";
import BlackjackStatsBlock from "@/components/BlackjackStatsBlock";
import Header from "@/components/Header";
import ProfilInfo from "@/components/ProfilInfo";
import styles from "@/styles/Profil.module.css";
import getUser from "@/utils/functions/getUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profil() {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!user) return router.push("/connexion");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Big Brain Games</title>
      </Head>
      <Header />

      <main className={styles.content}>
        <AllumettesStatsBlock />

        <BlackjackStatsBlock />

        <ProfilInfo />
      </main>

      <div className={styles.data}>
        Notre site ne collecte que votre adresse email à titre de donnée
        personnelle, laquelle sera utilisée avec précaution pour vous contacter
        en cas de besoin.
      </div>
    </div>
  );
}
