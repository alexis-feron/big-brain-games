import EditEmailForm from "@/components/EditEmailForm";
import EditPasswordForm from "@/components/EditPasswordForm";
import styles from "@/styles/ProfilInfo.module.css";
import getUser from "@/utils/functions/getUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProfilInfo() {
  const router = useRouter();
  useEffect((router) => {
    const user = getUser();
    if (!user) {
      user.logout();
      return router.push("/connexion");
    }
  }, []);

  const deleteAccount = async (ev) => {
    ev.preventDefault();

    const confirm = window.confirm(
      "Vous allez supprimer votre compte, cette action est irréversible. Êtes-vous sûr de vouloir continuer ?"
    );
    if (!confirm) return;

    const user = getUser();
    const resp = await user.deleteAccount();

    if (resp.success === true) {
      user.logout();
      router.push("/connexion");
    } else {
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.upperBlock}>
        <h1 className={styles.title}>MES INFORMATIONS</h1>
      </div>

      <div className={styles.parent}>
        <div className={styles.child}>
          <EditEmailForm />
        </div>

        <div className={styles.child}>
          <EditPasswordForm />
        </div>

        <button
          onClick={(ev) => deleteAccount(ev)}
          className={styles.deleteButton}
        >
          SUPPRIMER MON COMPTE
        </button>
      </div>
    </section>
  );
}
