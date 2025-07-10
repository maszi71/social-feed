import { CommentType } from "../types/CommentType";


export function CommentsSection({
  comments,
  title,
}: {
  comments: CommentType[];
  title: string;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold my-4">
        {title}
      </h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="  p-4 rounded-lg border border-gray-200"
          >
            <p className="text-sm font-medium ">{comment.name}</p>
            <p className="text-xs ">{comment.email}</p>
            <p className="mt-2  text-sm">{comment.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
