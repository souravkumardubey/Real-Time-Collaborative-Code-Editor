import {Divider, Image, List, ListContent, ListHeader, ListItem} from "semantic-ui-react";
export default function UsersList({user}){
    // const [user,setUser] = useState([...obj]);
    // const [prev,setPrev] = useState(-1);
    // function onItemClick(event,data){
    //     if(prev !== -1){
    //         user[prev].open = false;
    //     }
    //     user[data.value].open = true;
    //     setPrev(data.value);
    //     setUser((prevState)=>[...prevState])
    // }
    // function onSave(run,edit,lang,ind){
    //     user[ind].run = run;
    //     user[ind].edit = edit;
    //     user[ind].lang = lang;
    //     user[ind].open = false;
    //     setUser((prevState)=>[...prevState]);
    // }
    console.log()
    const items = []
    const names = ["daniel","steve","molly","jenny","matthew"]
    for(let i = 0;i < user.length;i++){
        items.push(
            <ListItem value={i} key={i} >
                <Image avatar src={`https://react.semantic-ui.com/images/avatar/large/${names[i % 5]}.jpg`}></Image>
                <ListContent>
                    <ListHeader as={"h4"}>{user[i]["userName"]}</ListHeader>
                    {/*{*/}
                    {/*    // eslint-disable-next-line no-prototype-builtins*/}
                    {/*    admin && !user[i].hasOwnProperty("admin") &&*/}
                    {/*    <Permission permission={{run:user[i].permission.run,edit:user[i].permission.edit,lang:user[i].permission.lang}} visible={user[i].open} ind={i} onSave={onSave}/>*/}
                    {/*}*/}
                </ListContent>
            </ListItem>
        )
    }
    return (
        <List selection>
            <ListHeader>Users In the Room</ListHeader>
            <Divider/>
            {items}
        </List>
    );
}