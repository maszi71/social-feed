import { render, screen } from "@testing-library/react";
import { CommentsSection } from "@/app/components/CommentsSection";
import * as reactQuery from "@tanstack/react-query";
import type { CommentType } from "@/app/types/CommentType";

jest.mock("../providers/LangContext", () => ({
  useT: () => ({
    loadingComments: "Loading comments...",
    failedToLoadComments: "Failed to load comments",
  }),
}));

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

describe("CommentsSection", () => {
  const sampleComments: CommentType[] = [
    {
      id: 1,
      postId: 1,
      name: "John Doe",
      email: "john@example.com",
      body: "This is a comment",
    },
    {
      id: 2,
      postId: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      body: "Another comment",
    },
  ];

  const defaultProps = {
    postId: "1",
    title: "Comments",
  };

  const useQueryMock = reactQuery.useQuery as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    useQueryMock.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CommentsSection {...defaultProps} />);
    expect(screen.getByText("Loading comments...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useQueryMock.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed"),
    });

    render(<CommentsSection {...defaultProps} />);
    expect(screen.getByText("Failed to load comments")).toBeInTheDocument();
  });

  it("renders comments list", () => {
    useQueryMock.mockReturnValue({
      data: sampleComments,
      isLoading: false,
      error: null,
    });

    render(<CommentsSection {...defaultProps} />);

    expect(screen.getByText("Comments")).toBeInTheDocument();
    sampleComments.forEach((comment) => {
      expect(screen.getByText(comment.name)).toBeInTheDocument();
      expect(screen.getByText(comment.email)).toBeInTheDocument();
      expect(screen.getByText(comment.body)).toBeInTheDocument();
    });
  });
});
