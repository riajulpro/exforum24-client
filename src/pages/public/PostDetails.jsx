import { useLoaderData, useParams } from "react-router-dom";
import useComments from "../../hooks/data/useComments";
import Comments from "../../components/PostDetails/Comments";
import CreateComment from "../../components/PostDetails/CreateComment";
import PostInfo from "../../components/PostDetails/PostInfo";

const PostDetails = () => {
  const { id: pageId } = useParams();

  const { data: singlePost } = useLoaderData();

  const { comments = [], refetch } = useComments();
  const currentComment = comments.filter(
    (comment) => comment.forPost === pageId
  );

  return (
    <div className="md:w-9/12 mx-auto grid grid-cols-12 gap-3 my-5">
      <div className="col-span-2">Left</div>
      <div className="col-span-7">
        <div>
          {singlePost.map((current) => (
            <PostInfo key={current._id} post={current} />
          ))}
        </div>
        <div>
          <CreateComment postId={pageId} refetchHandle={refetch} />
        </div>
        <div>
          {currentComment?.map((comment) => (
            <Comments key={comment._id} refetch={refetch} comment={comment} />
          ))}
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default PostDetails;
