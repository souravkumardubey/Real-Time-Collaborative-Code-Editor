import {Container, Menu, Image, Button} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    return (
        <Menu style={{margin:"0 0 0 0"}}>
            <Container>
                <Menu.Item as='a' header onClick={()=>navigate("/")}>
                    <Image size='mini' src='http://172.20.10.3:3155/logo.png' style={{ marginRight: '1.5em' }} />
                    Code Along
                </Menu.Item>
                <Menu.Item as='a' onClick={()=>navigate("/")}>Join Room</Menu.Item>
                <Menu.Item as='a' position={"right"}>
                    {
                        // eslint-disable-next-line no-prototype-builtins
                        !localStorage.hasOwnProperty("userName") &&
                        <>
                            <Button primary as='a' style={{marginRight:"10px"}} onClick={()=>navigate("/login")}>Log in</Button>
                            <Button color={"yellow"} onClick={()=>navigate("/signup")}>Sign up</Button>
                        </>
                    }
                </Menu.Item>
            </Container>
        </Menu>

    );
}