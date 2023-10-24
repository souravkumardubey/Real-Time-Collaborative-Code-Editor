import style from "./Room.module.css"
import EditorWindow from "./EditorWindow.jsx";
import DropDownMenu from "./DropDownMenu.jsx";
import { loader } from "@monaco-editor/react";
import {useEffect, useRef, useState} from "react";
import { toast } from "sonner";
import axios from 'axios';
import {RotatingLines} from "react-loader-spinner";
import nightOwl from "monaco-themes/themes/Night Owl.json";
import monokai from "monaco-themes/themes/Monokai.json";
import twilight from "monaco-themes/themes/Twilight.json";
import github from "monaco-themes/themes/GitHub.json";

const SUBMISSION_TOKEN = "submission_token";
const USER_LANG_PREF = "user_lang";
const USER_THEME_PREF = "user_theme";
const themeData = [null,nightOwl,monokai,twilight,github];

const monacoThemes = [
    {
        label:"Light",
        name:"light"
    },
    {
        label:"Night Owl",
        name:"night-owl"
    },
    {
        label:"Monokai",
        name:"monokai",
    },
    {
        label:"Twilight",
        name:"twilight"
    },
    {
        label:"GitHub",
        name:"github"
    }
]
const programmingLanguages = [
    {
        id:93,
        label:"Javascript",
        name:"javascript",

    },
    {
        label:"Python 3",
        id:71,name:"python"
    },
    {
        label:"Java",
        id:91, name:"java"
    },
    {
        label:"C++",
        id:54,
        name:"cpp"
    },
]



const defineTheme = (name,ind) => {
    return new Promise((res)=>{
        loader.init().then((monaco) => {
            monaco.editor.defineTheme(name,themeData[ind]);
            res();
        });
    })

};


export default function Room(){
    const stdInputRef = useRef(null);
    const [lang,setLang] = useState(programmingLanguages[initInd(USER_LANG_PREF)]);
    const [theme,setTheme] = useState(monacoThemes[initInd(USER_THEME_PREF)]);
    const [code,setCode] = useState("");
    const [loading,setLoading] = useState(false);
    const [output,setOutput] = useState({err:false,output:""});



    useEffect(() => {
        // eslint-disable-next-line no-prototype-builtins
        if(localStorage.hasOwnProperty(lang.name)){
            setCode(localStorage.getItem(lang.name));
        }else {
            setCode("");
        }
    }, [lang]);




    useEffect(() => {
        // eslint-disable-next-line no-prototype-builtins
        if(localStorage.hasOwnProperty(USER_THEME_PREF)){
            const ind = Number(localStorage.getItem(USER_THEME_PREF));
            if(ind > 0){
                defineTheme(monacoThemes[ind].name,ind).then(()=>{
                    setTheme(monacoThemes[ind]);
                })
            }
        }
    }, []);

    function initInd(C){
        // eslint-disable-next-line no-prototype-builtins
        if(localStorage.hasOwnProperty(C))return Number(localStorage.getItem(C));
        return 0;
    }

    function onLanguageChange(e){
        localStorage.setItem(USER_LANG_PREF,e.target.value);
        setLang(programmingLanguages[Number(e.target.value)]);
    }

    function onThemeChange(e){
        const ind = Number(e.target.value);
        if(ind !== 0){
            defineTheme(monacoThemes[ind].name,ind).then(()=>{
                setTheme(monacoThemes[ind]);
            })
        }else{
            setTheme(monacoThemes[ind]);
        }
        localStorage.setItem(USER_THEME_PREF,e.target.value);

    }

    function onTextChange(val){
        localStorage.setItem(lang.name,code);
        setCode(val);
    }

    async function executeCode(){
        // eslint-disable-next-line no-prototype-builtins
        if(localStorage.hasOwnProperty(SUBMISSION_TOKEN) || code.trim().length === 0)return;
        setLoading(true);
        const options = {
            method: 'POST',
            url: import.meta.env.VITE_APP_SUBMISSION_URL,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_APP_RAPID_API_HOST
            },
            data: {
                language_id: lang.id,
                source_code:btoa(code),
                stdin:btoa(stdInputRef.current.value)
            }
        };
        axios.request(options)
            .then((res)=>{
                if(res.status === 201){
                    localStorage.setItem(SUBMISSION_TOKEN,res.data.token);
                    getOutput();
                    toast.success(" Code submitted successfully.");
                }else{
                    setLoading(false);
                    toast.error("Code execution failed. Run  again." );
                }
            }).catch(()=>{
                setLoading(false);
                toast.error("Something went wrong")
            })
    }

    function getOutput(){
        // eslint-disable-next-line no-prototype-builtins
        if(!localStorage.hasOwnProperty(SUBMISSION_TOKEN)){
            setLoading(false);
        }
        const options = {
            method:"GET",
            url:import.meta.env.VITE_APP_SUBMISSION_URL + localStorage.getItem(SUBMISSION_TOKEN),
            params: {
                base64_encoded:"true",
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_APP_RAPID_API_HOST
            }
        };
        axios.request(options)
            .then((res)=>{
                if(res.data.status.id !== undefined){
                    if(res.data.status.id === 1 || res.data.status.id === 2){
                        setTimeout(()=>{
                            getOutput();
                        },2000);
                        setLoading(true);
                    }else{
                        let obj = null;
                        if(res.data.status.id <= 4){
                            obj = {err:false,output:res.data.stdout !== null ? atob(res.data.stdout) : ""}
                        }else if(res.data.status.id === 5){
                            obj = {err:true,output:"Time Limited Exceeded"}
                        }else if(res.data.status.id === 6){
                            obj = {err:true,output:res.data.compile_output !== null ? atob(res.data.compile_output) : ""}
                        }else{
                            obj = {err:true,output:res.data.stderr !== null ? atob(res.data.stderr) : ""}

                        }
                        setOutput(obj);
                        setLoading(false);
                        localStorage.removeItem(SUBMISSION_TOKEN);
                    }
                }else{
                    setLoading(false);
                    localStorage.removeItem(SUBMISSION_TOKEN);
                }
            }).catch(()=>{
                setLoading(false);
                localStorage.removeItem(SUBMISSION_TOKEN);
                toast.message(`Code execution failed. Run  again.`);
            });
    }

    return (
        <div className={style.wrapper}>
            <div className={style.io}>
                <p style={{color:"whitesmoke",margin:"10px 0px"}}>Input: </p>
                <textarea className={style.input} ref={stdInputRef} />
                <div style={{display:"flex"}}>
                    <p style={{color:"whitesmoke",margin:"10px 0px",marginRight:"10px"}} >Output:</p>
                    <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.90"
                        width="25"
                        visible={loading}
                    />
                </div>
                <textarea readOnly={true} className={style.output} style={{color:output.err ? "red":"black"}} value={output.output}/>
                <button className={style.btn} onClick={executeCode} disabled={loading}>Run</button>
            </div>

            <div className={style.editor}>
                <div className={style.dropdown}>
                    <DropDownMenu onSelect={onLanguageChange} selected={initInd(USER_LANG_PREF)} options={programmingLanguages} styles={{marginRight:"10px"}}/>
                    <DropDownMenu options={monacoThemes} onSelect={onThemeChange} selected={initInd(USER_THEME_PREF)}/>
                </div>
                <EditorWindow lang={lang.name} theme={theme.name}  handler={onTextChange} val={code}/>
            </div>
        </div>

    )
}