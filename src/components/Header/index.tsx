import { LinkTo } from "../Link";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" />
        <nav>
          <LinkTo href="/" activeClass={styles.active}>
            <a>Home</a>
          </LinkTo>

          <LinkTo href="/posts" activeClass={styles.active}>
            <a>Posts</a>
          </LinkTo>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
