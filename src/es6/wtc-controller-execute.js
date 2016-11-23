let initiated = false,
    instance = null;

class executeControllers {
  constructor() {
    var els, objreturn;

    els = document.querySelectorAll('[data-controller]');
    objreturn = [];

    for (var i = 0; i <= els.length - 1; i++) {
      let op = els[i];
      let data = op.data || {initialised: false, instance: null};

      if (data.initialised) {
        return;
      }

      let ns = op.getAttribute('data-namespace');
      if (!ns) {
        op.setAttribute('data-namespace', '');
        ns = '';
      }
      let controller = op.getAttribute('data-controller');
      ns = this.getAddress(ns.split('.'));
      objreturn.push(op);

      try {
        this.instanciate(data, controller, ns, op);
      } catch (_error) {
        console.warn("Error: " + _error.message);
      }

      op.data = data;
    }

    return objreturn;
  }

  getAddress(address) {
    var baseAddress = window;
    for (let i in address) {
      if (typeof baseAddress[address[i]] === "object") {
        baseAddress = baseAddress[address[i]];
      } else {
        return window;
      }
    }

    return baseAddress;
  }

  instanciate(data, controller, ns, op) {
    if (typeof ns[controller] === 'function') {
      data.instance = new ns[controller](op);
      data.initialised = true;
      return data.instance;
    } else {
      throw new Error("The controller " + controller + " does not exist at namespace " + op.getAttribute('data-namespace'));
    }
  }

  static init() {
    if (!initiated) {
      initiated = true;
      return instance !== null ? instance : instance = new executeControllers();
    } else {
      return instance;
    }
  }
}

export default executeControllers;
