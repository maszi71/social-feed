import { render, screen } from "@testing-library/react";
import { PostPreview } from "@/app/components/PostPreview";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, width = "100", height = "100" }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));

jest.mock("../providers/LangContext", () => ({
  useT: () => ({
    livePreview: "Live Preview",
    postBodyPlaceholder: "Start typing your post...",
  }),
}));

describe("PostPreview", () => {
  const defaultProps = {
    title: "Preview Title",
    body: "Preview content here.",
    image: "https://example.com/preview.jpg",
  };

  it("renders the preview header", () => {
    render(<PostPreview {...defaultProps} />);
    expect(screen.getByText("Live Preview")).toBeInTheDocument();
  });

  it("renders the post title and body", () => {
    render(<PostPreview {...defaultProps} />);
    expect(screen.getByText("Preview Title")).toBeInTheDocument();
    expect(screen.getByText("Preview content here.")).toBeInTheDocument();
  });

  it("renders the image when provided", () => {
    render(<PostPreview {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.image);
    expect(img).toHaveAttribute("alt", "Preview");
  });

  it("shows placeholder title/body when values are empty", () => {
    render(<PostPreview title="" body="" image="" />);
    expect(screen.getByText("Post title here")).toBeInTheDocument();
    expect(screen.getByText("Start typing your post...")).toBeInTheDocument();
  });

  it("does not render image if none is provided", () => {
    render(<PostPreview title="t" body="b" image="" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
