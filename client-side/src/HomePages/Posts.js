import { useEffect, useState, useContext } from "react";
import Post from "./Post";
//import { MyContext } from "./Home";
const urlPrefix = "http://localhost:3001/";
function Posts() {
    const [posts, setPosts] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const userId = JSON.parse(localStorage["currentUser"]).id;
    const getPosts = async () => {
        try {
          console.log("in get posts");
            let res = await fetch(`http://localhost:3001/users/${userId}/posts`);
            let userPosts = await res.json();
            setPosts(userPosts);
            return 
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    const selectPost = (id) => {
        setSelectedPost(id);
    }
  
    const deletePost = async (id) => {
        try {
          await fetch(`${urlPrefix}users/posts/${id}/comments`, {
            method: "DELETE",
            headers: {
           "Content-type": "application/json; charset=UTF-8",},
          });
          await fetch(`${urlPrefix}users/posts/${id}`, {
            method: "DELETE",
            headers: {
           "Content-type": "application/json; charset=UTF-8",},
          });
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (err) {
          console.log(err);
        }
      };

      const addPost = async () => {
        try {
            const newPost = {
              title: title,
              body: body,
            };
      
            const res = await fetch(`${urlPrefix}users/${userId}/posts`, {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(newPost),
            });
      
            if (res.ok) {
              const createdPost = await res.json();
              console.log(createdPost);
              setPosts((prevPosts) => [...prevPosts, createdPost]);
              setTitle("");
              setBody("");
            } else {
              console.log("Failed to create a new post");
            }
          } catch (err) {
            console.log(err);
          }
      };

      const updatePost=(newVal,postId)=>{

        console.log('im in update post')
        fetch(`${urlPrefix}users/posts/${postId}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              bodyPost: newVal
            })
          })
            .then((response) => response.json())
            .then((data) => {
                setPosts((prevList) => {
                    return prevList.map((post) => {
                      if (post.id === postId) {
                        return {
                          ...post,
                          body: newVal
                        };
                      }
                      return post;
                    })
            })
        })
            .catch((error) => {
              console.error("Error could not add item:", error);
            });
    }
    return (
        <div>
            <h1>Posts</h1>
          

            {!posts ? 'Loading...' :
                posts.map(post =>
                    <div key={post.id}>
                     <Post
                    key={post.id}
                    postId={post.id}
                    title={post.title}
                    updatePost={updatePost}
                    body={post.body}
                    selected={post.id === selectedPost}
                    onClick={() => selectPost(post.id)} />
                    <button onClick={() => deletePost(post.id)}>Delete Post</button>
                    </div>
                    )
            }
             <form> 
                <label> Title:<input type="text"value={title} onChange={(e) => setTitle(e.target.value)} /></label><br />
                <label> Body:<textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea></label><br />
                <button type="button" onClick={addPost}> Add Post </button>
            </form>
        </div>
    );
}
export default Posts;