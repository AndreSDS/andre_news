import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
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
    <button className={styles.signinButton} type="button">
      <FaGithub color={isUserLoggedIn ? "#04d381" : "#eba417"} />
      {isUserLoggedIn ? <LoggedComponent /> : "Sign in with Github"}
    </button>
  );
}
