import {
    Button,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu
} from "semantic-ui-react";
import {useState} from "react";

export default function Permission({visible,onSave,permission,ind}){
    const [run,setRun] = useState(permission.run);
    const [edit,setEdit] = useState(permission.edit);
    const [lang,setLang] = useState(permission.lang);
    function handleToggle(type,e,val){
        console.log(type,val);
        if(type === "run")setRun(val)
        else if(type === "edit")setEdit(val);
        else if(type === "lang")setLang(val);
        e.stopPropagation();
    }

    return (
        <>
            <Dropdown icon={null} open={visible}>
                <DropdownMenu>
                    <DropdownItem style={{marginTop:"8px"}} onClick={(e)=>e.stopPropagation()}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            Edit
                            <Checkbox  checked={edit} onClick={(e,data)=>handleToggle("edit",e,data.checked)}/>
                        </div>
                    </DropdownItem>
                    <DropdownItem onClick={(e)=>{e.stopPropagation()}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            Run
                            <Checkbox checked={run} onClick={(e,data)=>handleToggle("run",e,data.checked)}/>
                        </div>
                    </DropdownItem>
                    <DropdownItem onClick={(e)=>{e.stopPropagation()}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            Change Language
                            <Checkbox checked={lang} style={{marginLeft:"6px"}}  onClick={(e,data)=> handleToggle("lang",e,data.checked)}/>
                        </div>
                    </DropdownItem>
                    <Button  compact floated={"left"} style={{margin:"8px"}} color={"red"}>Kick</Button>
                    <Button  compact floated={"right"} style={{margin:"8px"}} color={"teal"} onClick={()=>onSave(run,edit,lang,ind)}>save</Button>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}