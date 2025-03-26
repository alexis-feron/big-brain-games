import styles from "@/styles/ProfilStatsBlock.module.css";
import getUser from "@/utils/functions/getUser";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AllumettesStatsBlock() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect((router) => {
    async function getMatchesStats(router) {
      const user = getUser();
      let resp = await user.getAllumettesStats();

      if (!resp) {
        user.logout();
        setLoading(false);
        return router.push("/connexion");
      }

      resp.set("totalLoses", resp.get("totalGames") - resp.get("totalWins"));
      resp.set(
        "percentage",
        (resp.get("totalWins") /
          (resp.get("totalGames") == 0 ? 1 : resp.get("totalGames"))) *
          100
      );

      resp.forEach((value, key) => {
        switch (key) {
          case "totalGames":
            key = "Parties jouées";
            break;
          case "totalWins":
            key = "Parties gagnées";
            break;
          case "totalLoses":
            key = "Parties perdues";
            break;
          case "percentage":
            key = "Pourcentage de victoires";
            if (value == 1) value = 0;
            value = Math.round(value);
            value += "%";
            break;
          default:
            break;
        }

        let parent = document.querySelector(`.${styles.parentAllumettes}`);

        let uniqueStatsDiv = document.createElement("div");
        uniqueStatsDiv.setAttribute("class", styles.statsContent);

        let uniqueStatsP = document.createElement("span");
        uniqueStatsP.setAttribute("class", styles.statsValue);
        uniqueStatsP.innerHTML = `<strong>${key}:</strong> ${value}`;

        uniqueStatsDiv.appendChild(uniqueStatsP);
        parent.appendChild(uniqueStatsDiv);
      });
      setLoading(false);
    }
    getMatchesStats(router);
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
