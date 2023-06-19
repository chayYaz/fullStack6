function PostComment({name, email, body}) {
  return (
  <div className="comment">
      <h3>{name}</h3>
      <p>{body}</p>
      <p>{email}</p>
  </div>
  );
}
export default PostComment;