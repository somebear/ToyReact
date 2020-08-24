class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttributes(name, value) {
    this.root.setAttributes(name, value);
  }
  appendChild(component){
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttributes(name, value) {
    this.props[name] = value;
  }
  appendChild(component){
    this.children.push(component);
  }

  get root(){
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

export function createElement(type, attributes, ...children) {
  let e;

  if (typeof type === 'string') {
    e = new ElementWrapper(type);
  } else {
    e = new type;
  }

  for (let p in attributes) {
    e.setAttributes(p, attributes[p]);
  }

  let insertChildren = (children) => {
    for (let child of children) {
      if(typeof child === 'string') {
        child = new TextWrapper(child);
      }
      
      if(typeof child === 'object' && (child instanceof Array)) {
        insertChildren(child)
      } else {
        e.appendChild(child);
      }

    }
  }

  insertChildren(children)

  return e;
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root)
}