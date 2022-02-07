import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <button
      className={styles.signinButton}
      type="button"
      onClick={() => (isAuthenticated ? signOut() : signIn("github"))}
    >
      <FaGithub color={isAuthenticated ? "#04d381" : "#eba417"} />
      {isAuthenticated ? (
        <>
          <p>{session.user.name}</p>
          <FiX className={styles.closeIcon} />
        </>
      ) : (
        "Sign in with Github"
      )}
    </button>
  );
}
