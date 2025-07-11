import { render, screen } from "@testing-library/react";
import { PostDetail } from "@/app/components/PostDetail";
import { PostType } from "@/app/types/PostType";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, width = "100", height = "100" }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));


const mockPost: PostType = {
  id: "123",
  title: "Sample Post Title",
  body: "This is a detailed description of the post.",
  image: "https://example.com/image.jpg",
};

describe("PostDetail", () => {
  it("renders the post title", () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText("Sample Post Title")).toBeInTheDocument();
  });

  it("renders the post body", () => {
    render(<PostDetail post={mockPost} />);
    expect(
      screen.getByText("This is a detailed description of the post.")
    ).toBeInTheDocument();
  });

  it("renders the image with correct src and alt", () => {
    render(<PostDetail post={mockPost} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockPost.image);
    expect(image).toHaveAttribute("alt", mockPost.title);
  });
});
