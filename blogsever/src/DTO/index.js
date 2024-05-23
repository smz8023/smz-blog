class Mode {
  constructor({ code, data, message }) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class Success extends Mode {
  constructor({ code=0,data = {} ,message}) {
    try {
      super({ code, data:JSON.parse(data),message });
    } catch (error) {
      super({ code: 0, data,message });
    }
    
  }
}
class Error extends Mode {
  constructor({ code, message }) {
    super({ code, message });
  }
}
module.exports = { Success, Error };
