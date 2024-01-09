import {Button, Card, CardContent, CardDescription, CardHeader, Divider, Image} from "semantic-ui-react";

export default function RequestCard({userName,handler}){
    return (
        <Card style={{position:"absolute",zIndex:3,top:0,left:0,margin:"8px"}}>
            <CardContent>
                <Image
                    circular
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
                />
                <CardHeader>{userName}</CardHeader>
                <CardDescription>wants to join the Room</CardDescription>
                <div className='ui two buttons' style={{marginTop:"14px"}}>
                    <Button basic color='green' onClick={()=>handler(true)}>Approve</Button>
                    <Button basic color='red' onClick={()=>handler(false)}>Decline</Button>
                </div>
            </CardContent>
            {
                // req.length > 0 &&
                // <>
                //     <Divider style={{margin:"0px",marginBottom:"8px"}}/>
                //     <div style={{display:"flex",justifyContent:"space-between",padding:"8px"}}>
                //         <Button icon={"caret left"} size={"mini"}/>
                //         <text>change</text>
                //         <Button icon={"caret right"} size={"mini"}/>
                //     </div>
                // </>
            }
        </Card>
    );
}