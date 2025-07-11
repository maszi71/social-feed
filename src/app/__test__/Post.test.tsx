import { render, screen } from "@testing-library/react";
import { Post } from "@/app/components/Post";
import { PostType } from "@/app/types/PostType";
import { LangProvider } from "@/app/providers/LangContext";
import en from '../dictionaries/en.json'; 


jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, width = "100", height = "100" }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));


jest.mock('../providers/LangContext', () => {
  const actual = jest.requireActual('../providers/LangContext');
  return {
    ...actual,
    useT: () => en,
  };
});

const mockPost: PostType = {
  id: "1",
  title: "Test Title",
  body: "This is the body of the test post.",
  image: "https://example.com/image.jpg",
};

describe("Post component", () => {
  it("renders post title and body", () => {
    render(
      <LangProvider lang="en" dictionary={en}>
        <Post post={mockPost} />
      </LangProvider>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is the body of the test post.")).toBeInTheDocument();
  });

  it("renders correct image", () => {
    render(
      <LangProvider lang="en" dictionary={en}>
        <Post post={mockPost} />
      </LangProvider>
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockPost.image);
    expect(image).toHaveAttribute("alt", mockPost.title);
  });

  it("links to correct post URL", () => {
    render(
      <LangProvider lang="en" dictionary={en}>
        <Post post={mockPost} />
      </LangProvider>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/post/1");
  });
});
