import styles from "../styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          &copy; {currentYear} Big Brain Games -{" "}
          <a
            className={styles.link}
            href="https://www.alexis-feron.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alexis Feron
          </a>
        </p>
      </div>
    </footer>
  );
}
