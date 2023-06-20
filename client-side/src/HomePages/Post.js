import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import { Link } from "react-router-dom";

function Post(props) {
    
const urlPrefix = "http://localhost:3001/";
    const [displayComments, setDisplayComments] = useState('none');
    const [comments, setComments] = useState(null);
    const [mail, setMail] = useState("");
    const [body, setBody] = useState("");
    const [updateBody, setUpdateBody] = useState("");
    const [name, setName] = useState("");
    const userId = JSON.parse(localStorage["currentUser"]).id;
    const getComments = async () => {
        console.log("in get comments");
        try {
            let postId=props.postId
          let res = await fetch(`http://localhost:3001/users/posts/${postId}/comments`);
            let postPomments = await res.json();
            setComments(postPomments);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect( () => {
        getComments();
    }, []);

    const toggleComments = (e) => {
        e.preventDefault()
        if(displayComments === 'none') {
            setDisplayComments('block')
        } else {
            setDisplayComments('none')
        }
    }
    const addComment=()=>{
        var emailVal = mail;
        var nameVal =name;
        var bodyVal = body;
        fetch(`${urlPrefix}users/posts/${props.postId}/comments`, {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              name: nameVal,
              email: emailVal,
              body: bodyVal
            })
          })
            .then((response) => response.json())
            .then((data) => {
              setComments((prevList) => [...prevList, 
                {
                    postId:props.postId,
                    id:data.insertId,
                    body:bodyVal,
                    name:nameVal,
                    email:emailVal
                  }]);
                  setMail("");
                  setName("");
                  setBody("");
                  console.log(comments);
            })
            .catch((error) => {
              console.error("Error could not add item:", error);
            });
    }


    const handleChangeDeleteComment=(event)=>{
            let commentId = event.target.id;
            // let currentComment = comments.find((obj) => obj.id == commentId);
        
            console.log(comments);
            fetch(`${urlPrefix}users/${userId}/posts/${props.postId}/comments/${commentId}`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setComments((prevItems) =>
                  prevItems.filter((item) => (item.id != commentId))
                );
              })
              .catch((error) => {
                console.error("Error coud not delete:", error);
              });
 
    }

   

   
    return (
        <div className={'post' + (props.selected ? ' selected': '')}>
            <h2><Link className="h2" onClick={props.onClick}>{props.title}</Link></h2>
            <p>{props.body}</p>
            <div className="comments" style={{display: !props.selected && 'none'}}>
            <button onClick={() => props.updatePost(updateBody, props.postId)} >
              Update Post 
              </button>

              <textarea value={updateBody} onChange={(e) => setUpdateBody(e.target.value)} required></textarea> 
                <Link onClick={toggleComments}>Comments</Link><br />
                <div style={{display: displayComments}}>
                    {
                    !comments ? 'Loading...' :
                        comments.map(comment => 
                            <PostComment
                                key={comment.id}
                                id={comment.id}
                                name={comment.name}
                                email={comment.email}
                                body={comment.body}
                                handleChangeDeleteComment={handleChangeDeleteComment}/>)
                    }
                </div>
                <div>
                <form>   
                    <label> Mail:<input type="text" value={mail} onChange={(e) => setMail(e.target.value)} required /></label><br />
                    <label> Name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label><br />
                    <label> Body:<textarea value={body} onChange={(e) => setBody(e.target.value)} rows="4" cols="50" required></textarea> </label><br />
                    <input type="button" value="add comment" onClick={addComment}/>
                </form>
                    
                </div>
            </div>
        </div>
    );
}
export default Post;