import React from 'react';

class Vote extends React.Component {
    vote_ref = React.createRef()
    render(){
        return <div ref={this.vote_ref}>Vote</div>
    }

    componentDidMount(){
        let vote_com = this.vote_ref.current;

        console.log(vote_com)
    }
}

export default Vote;

class Parent{
    getNum = ()=>{
        console.log(this)
    }
    getVal(){
        console.log(111)
    }
    static staticFun(){
        console.log('static function')
    }
}

function isObject(obj){
    return obj !== null && /^(function|object)$/.test(typeof obj)
}


// Parent.prototype.y = 2000

// let p = new Parent()
// Object.getPrototypeOf(p).y =4000
// console.dir(p)
// console.dir(Parent)