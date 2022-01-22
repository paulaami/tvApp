import { getShowsByKey, getShowById } from "./requests.js";
import { mapListToDOMElems, createDOMElem } from "./domInteractions.js";

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
    this.fetchAndDisplayShows();
  };

  connectDomElems = () => {
    const listOfIds = [...document.querySelectorAll("[id]")].map((el) => el.id);
    const listOfShowNames = [
      ...document.querySelectorAll("[data-show-name]"),
    ].map((el) => el.dataset.showName);

    this.viewElems = mapListToDOMElems(listOfIds, "id");
    this.showNameButtons = mapListToDOMElems(listOfShowNames, "data-show-name");
  };

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach((showName) =>
      this.showNameButtons[showName].addEventListener(
        "click",
        this.setCurrentNameFilter
      )
    );
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    getShowsByKey(this.selectedName).then((shows) => this.renderCards(shows));
  };

  renderCards = (shows) => {
    for (const { show } of shows) {
      this.createShowCard(show);
    }
  };
  //   <div class="card" style="width: 18rem;">
  //   <img src="..." class="card-img-top" alt="...">
  //   <div class="card-body">
  //     <h5 class="card-title">Card title</h5>
  //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  // </div>

  createShowCard = (show) => {
    console.log(show);
    const divCard = createDOMElem("div", "card");
    const img = createDOMElem("img", "card-img-top", null, show.image.medium);
    const divCardBody = createDOMElem("div", "card-body");
    const h5 = createDOMElem("h5", "card-title", show.name);
    const p = createDOMElem("p", "card-text", show.summary);
    const btn = createDOMElem("button", "btn btn-primary", "Show details");

    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    this.viewElems.showsWrapper.appendChild(divCard);
  };
}

document.addEventListener("DOMContentLoaded", new TvMaze());
