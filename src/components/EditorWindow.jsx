import {Editor} from "@monaco-editor/react";
export default function EditorWindow({lang,theme,val,handler,onMount}){

    return (
        <Editor
            width={"100%"}
            height={"78vh"}
            language={lang}
            value={val}
            onChange={handler}
            theme={theme || 'vs-dark'}
            onMount={onMount}
        />
    )
}