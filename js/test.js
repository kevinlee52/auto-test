console.log(typeof 1)
console.log(typeof function(){})

class People {
    constructor(name, age) {
        this.name=name;
        this.age=age;
    }
    eat() {
        console.log(`${this.name} is eating.`);
    }
}

class Student extends People {
    constructor(name, age, id) {
        super(name, age);
        this.id = id;
    }
    study(){
        console.log(`${this.name} is studying.`);
    }
}

const s = new Student('Ming Xiao', 20, "62003");
console.log(s.__proto__ === Student.prototype);
console.log(Student.prototype.__proto__ === People.prototype);
console.log(People.prototype.__proto__ === Object.prototype);
console.log(s instanceof Student)
console.log(s instanceof People)
console.log(s instanceof Object)