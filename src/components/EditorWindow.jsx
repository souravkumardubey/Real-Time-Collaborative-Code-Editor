import {Editor} from "@monaco-editor/react";

export default function EditorWindow({lang,theme,val,handler}){
    return (
        <Editor
            width={"70vw"}
            height={"85vh"}
            language={lang}
            value={val}
            onChange={handler}
            theme={theme || 'vs-dark'}
        />
    )
}