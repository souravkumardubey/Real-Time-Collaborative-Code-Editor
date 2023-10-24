
export default function DropDownMenu({options=[],selected = 0,onSelect,styles={}}) {
    return (
        <select style={{minHeight:"50px",textAlign:"center",flex:1,...styles}} onChange={onSelect} >
            {options.map((val,ind) => <option key={ind}  value={ind} selected={ind === selected}>{val.label}</option> )}
        </select>
    )
}



