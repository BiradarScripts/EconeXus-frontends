import React, { useRef, useContext, useState, useEffect } from "react";
import Mycard from "./Mycard.js";
import UserContext from "../context/user/userContext";
import Postuseritem from './Postuseritem.js';

const Imagecarousel = () => {
  const userContext = useContext(UserContext);
  const [no, setNo] = useState(0);
  const { users } = userContext;

  const targetRef = useRef(null);

  const btnpressprev = () => {
    if (targetRef.current && no > 0) {
      let width = targetRef.current.clientWidth;
      targetRef.current.scrollLeft = targetRef.current.scrollLeft - width;
      setNo(no - 1);
    }
  };

  const btnpressnext = () => {
    if (targetRef.current && no < users.length - 1) {
      let width = targetRef.current.clientWidth;
      targetRef.current.scrollLeft = targetRef.current.scrollLeft + width;
      setNo(no + 1);
    }
  };

  const host = "http://localhost:8080";
  const [userPost, setUserPost] = useState([]);

  const getAllPost = async () => {
    try {
      const response = await fetch(`${host}/apis/post/getUserPost/${users[no]._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
      setUserPost(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      getAllPost();
    }
  }, [no, users]);

  return (
    <>
      <div className="upperproductcarousel">
        
        <div className="product-carousel">
          {no < users.length - 1 ? (
            <button  className="next-btn" onClick={btnpressnext}>
              <p>&gt;</p>
            </button>
          ) : null}
          {no > 0 ? (
            <button className="pre-btn"  onClick={btnpressprev}>
              <p>&lt;</p>
            </button>
          ) : null}

          <div className="product-container" ref={targetRef}>
            {users.map((user) => {
              return <Mycard key={user._id} matchedUser={user} postnumber={userPost.length} />;
            })}
          </div>
        </div>

      </div>

      <div className="postuseritem">
        <h1>Posts</h1>
        
        <div className="postuseritem-posts">
          {userPost.map((post) => {
              return <Postuseritem key={post._id} post={post} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Imagecarousel;

