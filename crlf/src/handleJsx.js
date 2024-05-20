/** create virtual DOM object */
export function createElement(ele,props, ...children){
    let virtualDOM = {
        $$typeof: Symbol('react.element'),
        key: null,
        ref: null,
        type: ele,
        props: {}
    }
    if (props != null){
        virtualDOM.props = {...props}
    }
    let len = children.length;
    if (len===1) virtualDOM.props.children=children[0];
    if (len > 1) virtualDOM.props.children=children;

    return virtualDOM;
}

// jsx -> babel-preset-react-app -> React.createElement(type,prop,...children) -> return virtualDOM object -> render -> real DOM type string type customized function(props)

/**encapsulation each function to improve for in*/
export function each(obj, callback){
    if (obj === null || typeof obj !== 'object') throw new TypeError('obj is not object');
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    let arr = Reflect.ownKeys(obj)
    arr.forEach(key=>{
        let value = obj[key]
        callback(key, value)
    })
}


let arr = [10,20]
arr[Symbol('AA')] = 200;
// Array.prototype.BB = 100;

console.log(arr)