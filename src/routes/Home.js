import { dbService } from "firebaseInit";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetForm from "components/TweetForm";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(dbService, "tweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const tweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetsArray);
      }
    );
  }, []);

  return (
    <div>
      <TweetForm userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={userObj.uid === tweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
