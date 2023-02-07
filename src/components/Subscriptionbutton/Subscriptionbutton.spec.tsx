import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscriptionButton } from "./";

jest.mock("next/router");

jest.mock("next-auth/react");

const pushMocked = () => jest.fn();

describe("SubscriptionButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = useSession as jest.MockedFunction<
      typeof useSession
    >;
    const useRouterMocked = useRouter as jest.MockedFunction<typeof useRouter>;

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<SubscriptionButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", async () => {
    const signInMocked = signIn as jest.MockedFunction<typeof signIn>;

    const useSessionMocked = useSession as jest.MockedFunction<
      typeof useSession
    >;
    const useRouterMocked = useRouter as jest.MockedFunction<typeof useRouter>;

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<SubscriptionButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    await userEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has a subscription", async () => {
    const useSessionMocked = useSession as jest.MockedFunction<
      typeof useSession
    >;
    const useRouterMocked = useRouter as jest.MockedFunction<typeof useRouter>;

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.example@email.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<SubscriptionButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    await userEvent.click(subscribeButton);

    expect(pushMocked()).toBeCalled();
  });
});
