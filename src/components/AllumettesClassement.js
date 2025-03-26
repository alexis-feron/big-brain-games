import { API_GET_MATCHES_LEADERBOARD } from "@/assets/variables";
import stylesCLS from "@/styles/Classement.module.css";
import styles from "@/styles/ProfilStatsBlock.module.css";
import useFetch from "@/utils/hooks/useFetch";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function AllumettesStatsBlock() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMatchesStats() {
      setLoading(true);
      let resp = await useFetch.get(API_GET_MATCHES_LEADERBOARD);

      if (!resp) {
        setLoading(false);
        return (document.body.innerHTML = "No matches stats found");
      }
      const winners = new Map();
      resp.data.forEach((stats) => {
        winners.set(
          stats.user,
          stats.totalWins + ` victoire${stats.totalWins > 1 ? "s" : ""}`
        );
      });

      let i = 1;
      winners.forEach((value, key) => {
        let parent = document.querySelector(`.${styles.parentAllumettes}`);

        let uniqueStatsDiv = document.createElement("div");
        uniqueStatsDiv.setAttribute("class", stylesCLS.statsContent);

        let uniqueStatsP = document.createElement("span");
        uniqueStatsP.setAttribute("class", styles.statsValue);
        uniqueStatsP.innerHTML = `<strong>${i}. ${key}:</strong> ${value}`;

        uniqueStatsDiv.appendChild(uniqueStatsP);
        parent.appendChild(uniqueStatsDiv);

        i++;
      });

      for (let j = winners.size; j < 10; j++) {
        let parent = document.querySelector(`.${styles.parentAllumettes}`);

        let uniqueStatsDiv = document.createElement("div");
        uniqueStatsDiv.setAttribute("class", stylesCLS.statsContent);

        let uniqueStatsP = document.createElement("span");
        uniqueStatsP.setAttribute("class", styles.statsValue);
        uniqueStatsP.innerHTML = `<strong>${i}. ????? :</strong> ?????`;

        uniqueStatsDiv.appendChild(uniqueStatsP);
        parent.appendChild(uniqueStatsDiv);

        i++;
      }
      setLoading(false);
    }
    getMatchesStats();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.upperBlock}>
        <h1 className={styles.title}>Allumettes</h1>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <FontAwesomeIcon icon={faSpinner} spin /> Chargement...
        </div>
      ) : (
        ""
      )}
      <div className={styles.parentAllumettes}></div>
    </section>
  );
}
