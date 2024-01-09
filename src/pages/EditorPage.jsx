import Room from "../components/Room.jsx"
import NavbarEditor from "../components/NavbarEditor.jsx";
const EditorPage = ({socket}) => {
  return(
      <div>
          <Room socket={socket}/>
      </div>
    )
};

export default EditorPage;
