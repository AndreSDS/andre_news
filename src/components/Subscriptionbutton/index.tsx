import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscriptionbuttonProps {
  priceId: string;
}

export function SubscriptionButton({ priceId }: SubscriptionbuttonProps) {
  const session = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    // criação checkout session
    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button onClick={handleSubscribe} className={styles.subscribreButton} type="button">
      Subscrib now
    </button>
  );
}
