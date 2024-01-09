import {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {Button, Confirm, Dimmer, Loader} from "semantic-ui-react";
import Navbar from "../components/Navbar.jsx";
import Logo from "../components/Logo.jsx";



const Home = ({socket}) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [loading,setLoading] = useState(false);
  const [inRoom,setInRoom] = useState({content:"",open:false});
    useEffect(() => {
        setLoading(true);
        handleSocket();
        socket.emit("checkUser",{userName:localStorage.getItem("userName")});
    }, [socket]);
    const createNewRoom = (e) => {
        e.preventDefault();
        const newId = uuidv4();
        setRoomId(newId);
        localStorage.setItem("roomId",newId);
        setLoading(true);
        socket.emit("connectRoom",{roomId:newId,type:"new",userName:localStorage.getItem("userName"),email:localStorage.getItem("email")})
    };
    function handleSocket(){
        socket.on("disconnect",()=>{
            toast.error("disconnected");
        })
        socket.on("err",(data)=>{
            toast.error(data.msg);
        })
        socket.on("checkRes",(data)=>{
            setLoading(false);
            if(data["roomData"] !== null){
                setInRoom({content:`You are already in a Room ${data["roomData"].roomId} do you want to leave`,open:true,roomId:data["roomData"].roomId});
            }
        });
        socket.on("joinRes",(data)=>{
            setLoading(false);
            // eslint-disable-next-line no-prototype-builtins
            if(data.hasOwnProperty("newR")){
                navigate(`/editor/${data.roomId}`,{
                    state:{admin:true}
                });
            }else{
                if(data.roomId === localStorage.getItem("roomId")){
                    if(data["allowed"]){
                        if(data.userName === localStorage.getItem("userName")){
                            navigate(`/editor/${data.roomId}`,{
                                state:{admin:false}
                            });
                        }
                    }else{
                        if(data.userName === localStorage.getItem("userName")){
                            toast.error("Access Denied");
                        }
                    }
                }
            }
        });
    }
  const joinRoom = () => {
      // eslint-disable-next-line no-prototype-builtins
      if(!localStorage.hasOwnProperty("userName")){
          navigate("/login");
          return;
      }
      if (!roomId) {
        toast.error("Room Id is required");
        return;
      }
      setLoading(true);
      socket.emit("connectRoom",{roomId:roomId,type:"req",userName:localStorage.getItem("userName"),email:localStorage.getItem("email")})
  };
  const handleEnterKey = (e) => {
    if (e.code === "Enter") joinRoom();
  };
  function handleConfirm(){
      setInRoom({content:"",open:false});
      socket.emit("leaveRoom",{roomId:inRoom.roomId,userName:localStorage.getItem("userName")});
  }
  function handleCancel(){
      setInRoom({content:"",open: false});
      navigate(`/editor/${localStorage.getItem("roomId")}`,{state:{admin:false}});
  }
  return (
      <>
          <Navbar/>
          <Loader active={loading} size={"large"}/>
          <Confirm content={inRoom.content} open={inRoom.open} onConfirm={handleConfirm} onCancel={handleCancel}/>
          <div className="homePageWrapper">
              <Logo />
              <div className="formWrapper">
                  <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
                  <div className="inputGroup">
                      <input
                          type="text"
                          disabled={loading}
                          className="inputBox roomId"
                          placeholder="ROOM ID"
                          onChange={(e) => {
                              localStorage.setItem("roomId",e.target.value);
                              setRoomId(e.target.value);
                          }}
                          value={roomId}
                          onKeyUp={handleEnterKey}
                      />
                      <Button disabled={loading} inverted type="submit" className="btn joinBtn" onClick={joinRoom}>
                          JOIN
                      </Button>
                      <span className="createInfo" hidden={!localStorage.hasOwnProperty("userName") || loading}>
                  Don&apos;t have an invite? &nbsp;
                              <a  href="" className="createNewBtn" onClick={createNewRoom}>
                    Create room
                            </a>
                        </span>
                  </div>
              </div>
          </div>
      </>
  )
};

export default Home;
