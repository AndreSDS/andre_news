import { render, screen } from "@testing-library/react";
import { LinkTo } from "./";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Link component", () => {
  it("should renders correctly", () => {
    render(
      <LinkTo href="/" activeClass="active">
        <a>Home</a>
      </LinkTo>
    );

    // debug();

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should receives active class", () => {
    render(
      <LinkTo href="/" activeClass="active">
        <a>Home</a>
      </LinkTo>
    );

    // debug();

    expect(screen.getByText("Home")).toHaveClass("active");
  });

  it("it should not receiving active class", () => {
    render(
      <LinkTo href="/posts" activeClass="active">
        <a>Posts</a>
      </LinkTo>
    );

    // debug();

    expect(screen.getByText("Posts")).not.toHaveClass("active");
  });
});
