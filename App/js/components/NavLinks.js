import { createElem } from "../helperFunc.js";

class NavLinks {
  constructor() {
    this.links = [
      { name: "Home", path: "../index.html" },
      { name: "Admin", path: "../pages/admin.html" },
      { name: "Login", path: "#" },
      { name: "Logout", path: "#" },
    ];
  }

  createLink(obj) {
    const aTag = createElem("a");
    aTag.textContent = obj.name;
    aTag.classList.add("navLink");
    aTag.href = obj.path;
    return aTag;
  }

  renderLinks(elem) {
    for (const link of this.links) {
      elem.appendChild(this.createLink(link));
    }
  }
}

export default NavLinks;
