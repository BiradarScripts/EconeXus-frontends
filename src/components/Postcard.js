import React,{useContext, useState,useRef} from "react";
import PostContext from "../context/post/postContext";

import Postitem from "./Postitem";


export default function Postcard() {
  
    const context = useContext(PostContext);
    const {posts,editPost}=context;
    const refClose=useRef(null)

    const [updatePost,setupdatePost]=useState({id:"",etitle:"",edescription:"",etag:""})

    const updatePostHandler=(currentNote)=>{
      setupdatePost({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
  
    const handleOnChange=()=>{
      const {id,etitle,edescription,etag}=updatePost
      console.log(updatePost)
      editPost(id,etitle,edescription,etag);
      refClose.current.click();
      
    }
      
    const onChange=(e)=>{
        setupdatePost({...updatePost,[e.target.name]:e.target.value})
    }

  return (
    <div>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="fa-solid fa-triangle-exclamation"></i> Editing your post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <label className="insidetext">
                    <input type="text" placeholder="Title" value={updatePost.etitle} className="inputfields" id="title" name="etitle" onChange={onChange}/>
              </label>

              <label className="insidetext">
                  <input type="text" placeholder="Description" value={updatePost.edescription} className="inputfields" name="edescription" onChange={onChange}/>
                </label>

                <div className="input-group">
                  <label className="insidetext">
                    <input type="text" placeholder="Tag" className="inputfields" value={updatePost.etag} name="etag" onChange={onChange}/>
                  </label>
                </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary mx-3"  onClick={handleOnChange}>Update</button>
            </div>
          </div>
        </div>
      </div>


      <div className="postscontainer">
        <h1>Your Posts</h1>
          <div className="inner-postcard-start">
            {posts.map((post)=>{
                return <Postitem key={post._id} updatePostHandler={updatePostHandler}  post={post} />
            })}
          </div>
      </div>

    </div>
  )
}