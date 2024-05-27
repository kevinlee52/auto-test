import { Button, Divider } from "antd";
import React, {useState} from "react";


const Hooks = function Hooks(){

    const dummyCall = ()=> {
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve([10,20,30])
            },1000)
        })
    }

    let [num, setNum ] = useState(0);

    const handleAdd = ()=>{
        setNum( num + 1)
    }
    return <div className="hook">
        <span>{num}</span>
        <Button onClick={handleAdd}>add</Button>
    </div>
}

export default Hooks;