import React, { useEffect, useState } from "react";
import Video from './Video';
import { GetWithComments, Search } from "../modules/videoManager";
import { useParams } from "react-router-dom";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const getVideos = () => {
    GetWithComments().then(videos => setVideos(videos));
  };

  const searchVideos = (event) => {
    event.preventDefault();
    let videoInput = event.target.value;
    let searchMatch = {};
    searchMatch[event.target.id] = videoInput;
    Search(videoInput, true).then(videos => setVideos(videos))
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="container">
      <form className='videoForm'>
        <input placeholder='Search' onChange={searchVideos}></input>
      </form>
      <div className="row justify-content-center">
        {videos.filter(video => video.userProfileId == id).map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default UserVideos;