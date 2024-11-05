
import { createContext ,useState,useContext} from "react";

import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const Postcontext = createContext();

function PostProvider({children}){
        const [posts, setPosts] = useState(() =>
            Array.from({ length: 30 }, () => createRandomPost())
          );
          const [searchQuery, setSearchQuery] = useState("");
        
        
          // Derived state. These are the posts that will actually be displayed
          const searchedPosts =
            searchQuery.length > 0
              ? posts.filter((post) =>
                  `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
              : posts;
        
          function handleAddPost(post) {
            setPosts((posts) => [post, ...posts]);
          }
        
          function handleClearPosts() {
            setPosts([]);
          }

          return  <Postcontext.Provider  value={{
            posts:searchedPosts,
            onClearPosts:handleClearPosts,
            searchQuery:searchQuery,
            setSearchQuery:setSearchQuery,
            onAddPost:handleAddPost,
          }}>
            {children}
          </Postcontext.Provider>
  
}
function PostConsumer(){
    const context =useContext(Postcontext);
    if(context===undefined) throw new Error("Error due to undefined value of context");
    return context;
}
export {PostProvider,PostConsumer} ;