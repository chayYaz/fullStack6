import { useEffect, useState, useContext } from "react";
import Post from "./Post";
//import { MyContext } from "./Home";

function Posts() {
    const [posts, setPosts] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
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

    return (
        <div>
            <h1>Posts</h1>
            {!posts ? 'Loading...' :
                posts.map(post => <Post
                    key={post.id}
                    postId={post.id}
                    
                    title={post.title}
                    body={post.body}
                    selected={post.id === selectedPost}
                    onClick={() => selectPost(post.id)}
                    />)
            }
        </div>
    );
}
export default Posts;