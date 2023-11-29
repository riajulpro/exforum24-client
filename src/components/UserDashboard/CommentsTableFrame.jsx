import { useParams } from "react-router-dom";
import useComments from "../../hooks/data/useComments";
import CommentsTable from "./CommentsTable";

const CommentsTableFrame = () => {
  const { id: pageId } = useParams();

  const { comments = [], refetch } = useComments();
  const currentComments = comments.filter(
    (comment) => comment.forPost === pageId
  );

  return (
    <div className="m-2">
      <CommentsTable comments={currentComments} refetch={refetch} />
    </div>
  );
};

export default CommentsTableFrame;
