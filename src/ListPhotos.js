import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ListPhotos() {
  const [photos, setPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const listInnerRef = useRef();

  function fetchData() {
    console.log("fetching");
    setCount(count + 1);
    fetch(
      `https://api.unsplash.com/photos/?page=${count}&client_id=Stn4svLNyfnIrEi5T0-4LuCS92wm3d7p6gNHKNgTIW4`
    )
      .then((response) => response.json())
      .then((json) => setPhotos([...photos, ...json]));

    // setTimeout(() => {

    // }, 3000);
  }
  useEffect(() => {
    // fetch(
    //   `https://api.unsplash.com/photos/?page=${count}&client_id=Stn4svLNyfnIrEi5T0-4LuCS92wm3d7p6gNHKNgTIW4`
    // )
    //   .then((response) => response.json())
    //   .then((json) => setPhotos([...photos, ...json]));
    fetchData();
    //  console.log(photos);
  }, []);

  console.log(photos);
  return (
    <div className="img-container">
      {/* {photos.map((photo, index) => {
        return (
          <div key={index} className="img">
            <img src={photo.links.download} width="500px" height="400px"></img>
            <h2>{photo.alt_description}</h2>
          </div>
        );
      })} */}
      {/* <button onClick={() => setCount(count + 1)}>Next</button> */}

      {/* <div
        className="list-inner"
        onScroll={() => onScroll()}
        ref={listInnerRef}
      ></div> */}

      <InfiniteScroll
        dataLength={photos.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {photos.map((photo, index) => {
          return (
            <div key={index} className="img">
              <img
                src={photo.links.download}
                width="500px"
                height="400px"
              ></img>
              <h2>{photo.alt_description}</h2>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default ListPhotos;
