import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import uuid from 'react-uuid';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {database,storage} from '../firebase'
import {Avatar,MoreVertIcon} from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavouriteIcon from '@material-ui/icons/Favorite';
import Overlay from "./Overlay";
function Feed() {

    // useEffect(()=>{
    //     console.log("feed is rendered");
    //   });
    
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    icon: {
        // backgroundColor: "red"
        position: "absolute",
        bottom: "-5vh",
        fontSize: "2rem"
    },
    heart: {
        left: "25vw",
    },
    chat: {
        left: "32vw"
    },
    notSelected: {
        color: "lightgray"
    }
    ,
    selected: {
        color: "red"
    }
  }));
    const [loading,setLoading]=useState(false);
    const {signout,currentUser}=useContext(AuthContext);
    const classes = useStyles();
    const [pageLoading,setPageLoading]=useState(true);
    const [user,setUser]=useState();
    const [isLiked,setLiked]=useState(false);
    const[videos,setVideos]=useState([]);
    const handleLogout=async ()=>{
        try{
            setLoading(true);
            await signout();
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        
        }
    }

    const handleInputFile=(e)=>{
        e.preventDefault();
        let file=e?.target?.files[0];
        if(file!=null){
            console.log(e.target.files[0]);
        }

        if(file.size / (1024 * 1024) > 20){
            alert("The Selected file is very big");
            return ;
        }
        // upload
        let uid=uuid();
        const uploadTask = storage.ref(`/posts/${uid}`).put(file);
        setLoading(true);
        // progress
        const f1=snapshot=>{
                      const progress=snapshot.bytesTransferred / snapshot.totalBytes;
                      console.log(progress);
                //   this callback is for providing the progress
        }
        // error
        const f2=()=>{
            alert("There was an error in uploading the file");
            return ;
        }
        // success
        const f3=()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                // 2.  
                // post collection -> post document put 
                let obj = {
                    comments: [],
                    likes: [],
                    url,
                    auid: currentUser.uid,
                    createdAt: database.getUserTimeStamp(),
                }
                //   put the post object into post collection 
                let postObj = await database.posts.add(obj);
                // 3. user postsId -> new post id put 
                await database.users.doc(currentUser.uid).update({
                    "postIds": [...user.postIds, postObj.id]
                })
                console.log(postObj);
                setLoading(false);
            })
        }
        uploadTask.on('state_changed', f1, f2, f3)
    }
    // component didMount
    useEffect(async ()=>{
        // profile page -> change
        // resource intensive

    //    let userData= database.users.doc(currentUser.uid).onSnapshot((snapshot)=>{
    //        console.log(snapshot.data());
    //        setUser(snapshot.data());
    //        setPageLoading(false);
    //    });
// how to get a document from a collection in firebase 
// auth user doesn't contains any ther data besides email,password,uid
// you need to get the complete document from the firestore using either email or uid
    let dataObject= await database.users.doc(currentUser.uid).get();
    setUser(dataObject.data());
    setPageLoading(false);
       

    },[])
    // post get
    useEffect(async ()=>{
       let unsub= await database.posts.orderBy("createdAt","desc").onSnapshot(async snapshot=>{
let videos=snapshot.docs.map(doc=> doc.data());
// let videoUrls=videos.map(video=> video.url);
// let auidArr=videos.map(video=>video.auid);
// let usersArr=[]
// for(let i=0;i<auidArr.length;i++){
//     let userObject=database.users.doc(auidArr[i]).get();
//     usersArr.push(userObject);
// }
let videosArr=[];
for(let i=0;i<videos.length;i++){
    let videoUrl=videos[i].url;
    let auid=videos[i].auid;
    let id = snapshot.docs[i].id;
    let userObject=await database.users.doc(auid).get();
    let userProfileUrl=userObject.data().profileUrl;
    let userName=userObject.data().username;
    videosArr.push({videoUrl,userProfileUrl,userName,puid: id,isOverlayActive: false,})
}
setVideos(videosArr);
})
       return unsub;
    },[])

    const handleCommentClicked = async (puid) => {
        let copyofVideos = [...videos];
        let idx = copyofVideos.findIndex((video) => {
            return video.puid == puid;
        });
        let videoObj = copyofVideos[idx];
        videoObj.isOverlayActive = true;
        setVideos(copyofVideos);
    }
    
    
    const handleLiked= async (puid)=>{
        console.log(puid)
        let postRef = await database.posts.doc(puid).get();
        let post = postRef.data();
        let likes = post.likes;
        if (isLiked == false) {
            database.posts.doc(puid).update({
                "likes": [...likes, currentUser.uid]
            })
        } else {
            let likes = post.likes.filter(lkuid => {
                return lkuid != currentUser.uid;
            })
            database.posts.doc(puid).update({
                "likes": likes
            })
        }
        setLiked(!isLiked)
    }

    return (
        pageLoading==true ? <div>Loading....</div> : <div>
            <div className="navbar">
            <Avatar alt="Remy Sharp" src={user.profileUrl} />

            <button onClick={handleLogout} disabled={loading}>Logout</button>

            </div>
            <div className="classes root">
            <div className="uploadImage">
      
      <input accept="file" className={classes.input} id="icon-button-file" type="file" 
      onChange={handleInputFile}
      />
      <label htmlFor="icon-button-file">
        <Button variant="contained" color="primary" component="span" endIcon={<PhotoCamera></PhotoCamera>} disabled={loading}>upload</Button>
      </label>
            </div>
            </div>
            <div className="feed">
    {videos.map((videoObj,idx) =>{
        return (
<div className="video-container">
<Video
src={videoObj.videoUrl}
id={videoObj.puid}
username={videoObj.userName}
>

</Video>
<FavouriteIcon className={[classes.icon,classes.heart,isLiked==false ?classes.notSelected:classes.selected]} onClick={()=>{handleLiked(videoObj.puid)}}></FavouriteIcon>
<ChatBubbleIcon className={[classes.icon, classes.chat, classes.notSelected]} onClick={() => { handleCommentClicked(videoObj.puid) }}>
</ChatBubbleIcon>
 {/* user click */}
{videoObj.isOverlayActive == true ? < Overlay></Overlay> : null}
    </div>
        )
    })}
</div>
        </div>
    )
}


function Video(props) {
  

    return (
      <video styles={{height:"86vh",
        marginBottom: "5rem",
        marginTop: "2rem",
        border: "1px solid red",}} muted="true" id={props.id} controls>
        <source
          src={props.src}
          
          type="video/mp4"
        ></source>
      </video>
    );
  }

export default Feed;
