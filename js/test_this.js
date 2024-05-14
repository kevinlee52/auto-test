function foo() {
  return this;
}
 
let bar = {
  foo,
 
  baz() {
    return this;
  },
};


typeof 1; //'number'
typeof ""; //'string'
typeof true; //'boolean'
typeof undefined; // 'undefined'
typeof null; //'object'
typeof [1, 2, 3]; //'object'
typeof {}; //'object'
typeof function () {}; //'function'
typeof Symbol(); //'symbol'
 
// `foo`
console.log(foo())       // global or undefined
console.log(bar.foo())   
console.log((bar.foo)())   
console.log((bar.foo = bar.foo)())   


// function foo() {
//   return function bar() {
//     console.log(x);
//   };
// }
 
// "foo" returns also a function
// and this returned function uses
// free variable "x"
 
// var returnedFunction = foo();
 
// // global variable "x"
// var x = 20;
 
// // execution of the returned function
// returnedFunction(); // 10, but not 20

// function F() {}

// console.log(F.prototype.constructor); // function F(){}
// console.log(F.prototype.constructor === F); // 构造器指向F

// const f = new F(); // 实例
// console.log(f.constructor === F);

// function httpClientFactory(baseUrl) {
//     return {
//       baseUrl: baseUrl,
//       listUsers: () => {
//         return axios.get(`${baseUrl}/users`)
//       },
//       getUser: (id) => {
//         return axios.get(`${baseUrl}/users/${id}`)
//       },
//       createUser: (user) => {
//         return axios.post(`${baseUrl}/users`, user);
//       },
//       listBooks: () => {
//         return axios.get(`${baseUrl}/books`)
//       },
//       getBook: (bookName) => {
//         return axios.get(`${baseUrl}/books/${bookName}`)
//       },
//       createBook: (book) => {
//         return axios.post(`${baseUrl}/books`, book)
//       }
//     }
//   }
  
//   const httpClient = httpClientFactory("https://your-endpoints/api");
//   httpClient.getUser("123");
//   httpClient.getBook("JavaScript Is Interesting");
//   console.log("The httpClient's baseUrl is " + httpClient.baseUrl);
  
  
//   class HttpClient {
//     constructor(baseUrl) {
//       this.baseUrl = baseUrl;
//       this.listUsers = this.listUsers.bind(this);
//       this.getUser = this.getUser.bind(this);
//       this.createUser = this.createUser.bind(this);
//       this.listBooks = this.listBooks.bind(this);
//       this.getBook = this.listUsers.bind(this);
//       this.createBook = this.createBook.bind(this);
//     }
  
//     listUsers() {
//       return axios.get(`${this.baseUrl}/users`)
//     }
  
//     getUser(id) {
//       return axios.get(`${this.baseUrl}/users/${id}`)
//     }
  
//     createUser(user) {
//       return axios.post(`${this.baseUrl}/users`, user);
//     }
  
//     listBooks() {
//       return axios.get(`${this.baseUrl}/books`)
//     }
  
//     getBook(bookName) {
//       return axios.get(`${this.baseUrl}/books/${bookName}`)
//     }
  
//     createBook(book) {
//       return axios.post(`${this.baseUrl}/books`, book)
//     }
//   }
  
//   const httpClient = new HttpClient("https://your-endpoints/api");
//   httpClient.getUser("123");
//   httpClient.getBook("JavaScript Is Interesting");
//   console.log("The httpClient's baseUrl is " + httpClient.baseUrl);