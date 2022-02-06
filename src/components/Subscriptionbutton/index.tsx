import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SubscriptionButton() {
  const isUserLoggedIn = true;

  function LoggedComponent(){
    return (
      <>
      <p>User From Github</p>
      <FiX className={styles.closeIcon} />
      </>
    )
  }

  return (
    <button className={styles.subscribreButton} type="button">
      Subscrib now
    </button>
  );
}
