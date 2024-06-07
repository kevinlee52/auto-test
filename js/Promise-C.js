function Promise(fn) {
  this.PromiseState = "Pending";
  this.PromiseResult = undefined;
  this.callbacks = [];
  let self = this;

  function resolve(data) {
    if (self.PromiseState !== "Pending") return;
    self.PromiseState = "Fulfilled";
    self.PromiseResult = data;
    if (self.callbacks.length > 0) {
      setTimeout(
        self.callbacks.map((item) => {
          item.sucCallback(data);
        })
      );
    }
  }

  function reject(data) {
    if (self.PromiseState !== "Pending") return;
    self.PromiseState = "Rejected";
    self.PromiseResult = data;
    if (self.callbacks.length > 0) {
      setTimeout(
        self.callbacks.forEach((item) => {
          item.failCallback(data);
        })
      );
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
Promise.prototype.then = function (sucCallback, failCallback) {
  let self = this;

  if (typeof failCallback !== "function") {
    failCallback = (reason) => {
      throw reason;
    };
  }

  if (typeof sucCallback !== "function") {
    sucCallback = (value) => value;
  }

  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (s) => {
              resolve(s);
            },
            (f) => {
              reject(f);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    if (this.PromiseState === "Fulfilled") {
      setTimeout(callback(sucCallback));
    }
    if (this.PromiseState === "Rejected") {
      setTimeout(callback(failCallback));
    }
    if (this.PromiseState === "Pending") {
      this.callbacks.push({
        sucCallback: function () {
          callback(sucCallback);
        },
        failCallback: function () {
          callback(failCallback);
        },
      });
    }
  });
};

Promise.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          arr[i] = v;
          count++;
          if (count === promises.length) {
            resolve(arr);
          }
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
