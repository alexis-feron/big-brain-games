import styles from "@/styles/Header.module.css";
import getUser from "@/utils/functions/getUser";
import {
  faBars,
  faCircleUser,
  faDice,
  faHouse,
  faLinesLeaning,
  faRankingStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [userConnected, setUserConnected] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    setUserConnected(user);
  }, []);

  useEffect(() => {
    let x = document.getElementsByClassName(styles.menuHidden)[0];
    x.style.display = isOpen ? "flex" : "none";
  }, [isOpen]);

  const logOut = (ev) => {
    ev.preventDefault();
    userConnected.logout();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <FontAwesomeIcon
        className={styles.navIcon}
        icon={faBars}
        onClick={() => setOpen(!isOpen)}
      />
      <nav className={styles.links}>
        <Link href="/" className={styles.navlink}>
          <FontAwesomeIcon icon={faHouse} className={styles.navbarIcon} />{" "}
          Accueil
        </Link>
        <Link href="/allumettes" className={styles.navlink}>
          <FontAwesomeIcon
            icon={faLinesLeaning}
            className={styles.navbarIcon}
          />{" "}
          Allumettes
        </Link>
        <Link href="/blackjack" className={styles.navlink}>
          <FontAwesomeIcon icon={faDice} className={styles.navbarIcon} />{" "}
          Blackjack
        </Link>
        <Link href="/classement" className={styles.navlink}>
          <FontAwesomeIcon icon={faRankingStar} className={styles.navbarIcon} />{" "}
          Classement
        </Link>
      </nav>

      <div className={styles.menuHidden} style={{ display: "none" }}>
        <FontAwesomeIcon
          className={styles.navIconHidden}
          icon={faXmark}
          onClick={() => setOpen(!isOpen)}
        />
        <nav className={styles.linksHidden}>
          <Link href="/" className={styles.navlink}>
            <FontAwesomeIcon icon={faHouse} className={styles.navbarIcon} />{" "}
            Accueil
          </Link>
          <Link href="/allumettes" className={styles.navlink}>
            <FontAwesomeIcon
              icon={faLinesLeaning}
              className={styles.navbarIcon}
            />{" "}
            Allumettes
          </Link>
          <Link href="/blackjack" className={styles.navlink}>
            <FontAwesomeIcon icon={faDice} className={styles.navbarIcon} />{" "}
            Blackjack
          </Link>
          <Link href="/classement" className={styles.navlink}>
            <FontAwesomeIcon
              icon={faRankingStar}
              className={styles.navbarIcon}
            />{" "}
            Classement
          </Link>
        </nav>
      </div>

      <div className={styles.account}>
        <div className={styles.globalAcc}>
          <div className={styles.accountButton}>
            <span>MON COMPTE</span>
            <FontAwesomeIcon
              className={styles.accountIcon}
              icon={faCircleUser}
            />
          </div>

          <div className={styles.dropdown}>
            {userConnected ? (
              <>
                <Link href="/profil">MON PROFIL</Link>
                <button
                  className={styles.logOutButton}
                  onClick={(ev) => {
                    logOut(ev);
                  }}
                >
                  SE DECONNECTER
                </button>
              </>
            ) : (
              <>
                <Link href="/connexion">SE CONNECTER</Link>
                <Link href="/inscription">S&apos;INSCRIRE</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
