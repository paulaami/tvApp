import { mapListToDOMElems } from "./domInteractions.js";
import { getShowsByKey } from "./requests.js";

class TvMaze {
  constructor() {
    this.viewElems = {};
    this.showNameButtons = {};
    this.selectedName = "harry";
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDomElems();
    this.setupListeners();
  };

  connectDomElems = () => {
    const listOfIds = [...document.querySelectorAll("[id]")].map((el) => el.id);
    const listOfShowNames = [
      ...document.querySelectorAll("[data-show-name]"),
    ].map((el) => el.dataset.showName);

    this.viewElems = mapListToDOMElems(listOfIds, "id");
    this.showNameButtons = mapListToDOMElems(listOfShowNames, "data-show-name");
    console.log(this.viewElems);
    console.log(this.showNameButtons);
  };

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach((showName) =>
    this.showNameButtons[showName].addEventListener("click", this.setCurrentNameFilter));
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
  }
}

document.addEventListener("DOMContentLoaded", new TvMaze());
