import styles from "./styles.module.scss";

interface SubscriptionbuttonProps {
  priceId: string;
}

export function SubscriptionButton({ priceId }: SubscriptionbuttonProps) {
  

  return (
    <button className={styles.subscribreButton} type="button">
      Subscrib now
    </button>
  );
}
