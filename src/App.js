import "./App.css";
import { useState,useEffect } from "react";
import { storage } from "./firebase";
import {ref,uploadBytes, listAll ,getDownloadURL} from "firebase/storage";
function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagelist,setImageList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const imageListRef = ref(storage,"images/")
  const uploadImage = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageName}`)
    uploadBytes(imageRef,imageUpload).then((snapshot) =>{
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev,url]);
      })
    })
  };
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach(item => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev,url]);
        })
      });
    });
  },[]);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          setFilteredImages((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    const filtered = imagelist.filter((url) =>
      url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchTerm, imagelist]);
  return (
    <>
    <div className="App">
      <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      </div>
      <div>
      Enter the file name <input type="text" name="fname" id="fname" value={imageName} onChange={(event) => setImageName(event.target.value)}/></div>
      <div>Tags <input type="text" name="tags" id="tags"/></div>
      <button onClick={uploadImage}>+</button>
      
      <div>
          <input
            type="text"
            placeholder="Search images"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </div>
      <div className="mainPart">
      
      {filteredImages.map((url, index) => (
          <img key={index} src={url} alt={imageName} />
        ))}
      </div>
      </>
  );
}

export default App;
