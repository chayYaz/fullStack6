function PostComment({name, email, body,id,handleChangeDeleteComment}) {
  return (
  <div className="comment">
      <h3>{name}</h3>
      <p>{body}</p>
      <p>{email}</p>
      <input
        className="liItem"
        type="button"
        value="delete comment"
        id={id}
        onClick={handleChangeDeleteComment}
      />
  </div>
  );
}
export default PostComment;