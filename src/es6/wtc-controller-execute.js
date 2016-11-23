let initiated = false,
    instance = null;

class executeControllers {
  constructor(controllersList) {
    if (!initiated) {
      initiated = true;
      instance = this;
    } else {
      return instance;
    }

    var els, objreturn;

    this.controllersList = controllersList;
    els = document.querySelectorAll('[data-controller]');

    for (var i = 0; i <= els.length - 1; i++) {
      let op = els[i];
      let data = op.data || {initialised: false, instance: null};

      if (data.initialised) {
        return;
      }

      let controller = op.getAttribute('data-controller');

      try {
        this.instanciate(data, controller, op);
      } catch (_error) {
        console.warn("Error: " + _error.message);
      }

      op.data = data;
    }

    return instance;
  }

  instanciate(data, controller, op) {
    if (typeof this.controllersList[className] === 'function') {
      data.instance = new this.controllersList[className](op);
      data.initialised = true;
      return data.instance;
    } else {
      throw new Error("The controller " + controller + " does not exist at namespace " + op.getAttribute('data-namespace'));
    }
  }
}

export default executeControllers;
