import { Button, Divider } from "antd";
import React, {useState} from "react";


const Hooks = function Hooks(){

    let [num, updateNum ] = useState(0);

    const handleAdd = ()=>{
        updateNum( num + 1)
    }
    return <div className="hook">
        <span>{num}</span>
        <Button onClick={handleAdd}>add</Button>
    </div>
}

export default Hooks;