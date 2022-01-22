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

  setCurrentNameFilter = (event) => {
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    getShowsByKey(this.selectedName).then((shows) =>
      this.renderCardsOnList(shows)
    );
  };

  renderCardsOnList = (shows) => {
    [...document.querySelectorAll('[data-show-id]')].forEach(btn => btn.removeEventListener('click', this.openDetailsView));

    this.viewElems.showsWrapper.innerHTML = "";

    for (const { show } of shows) {
      const card = this.createShowCard(show);
      this.viewElems.showsWrapper.appendChild(card);
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

  openDetailsView = (event) => {
    const { showId } = event.target.dataset;
    console.log(showId);
    getShowById(showId).then((show) => {
      const card = this.createShowCard(show, true);
      this.viewElems.showPreview.appendChild(card);
      this.viewElems.showPreview.style.display = "block";
    });
  };

  closeDetailsView = (event) => {
    const { showId } = event.target.dataset;
    const closeBtn = document.querySelector(`[id="showPreview"] [data-show-id="${showId}"]`)
    closeBtn.removeEventListener("click", this.closeDetailsView);
    this.viewElems.showPreview.style.display = "none";
    this.viewElems.showPreview.innerHTML = "";
  };

  createShowCard = (show, isDetailed) => {
    const divCard = createDOMElem("div", "card");
    const divCardBody = createDOMElem("div", "card-body");
    const h5 = createDOMElem("h5", "card-title", show.name);
    const btn = createDOMElem("button", "btn btn-primary", "Show details");
    let img, p;

    if (show.image) {
      if (isDetailed) {
        img = createDOMElem("div", "card-preview-bg");
        img.style.backgroundImage = `url('${show.image.original}')`;
      } else {
        img = createDOMElem("img", "card-img-top", null, show.image.medium);
      }
    } else {
      img = createDOMElem(
        "img",
        "card-img-top",
        null,
        "https://via.placeholder.com/210x295"
      );
    }

    if (show.summary) {
      if (isDetailed) {
        p = createDOMElem("p", "card-text", show.summary);
      } else {
        p = createDOMElem("p", "card-text", `${show.summary.slice(0, 80)}...`);
      }
    } else {
      p = createDOMElem(
        "p",
        "card-text",
        "There is no summary for that show yet"
      );
    }

    btn.dataset.showId = show.id;

    if (isDetailed) {
      btn.addEventListener("click", this.closeDetailsView);
    } else {
      btn.addEventListener("click", this.openDetailsView);
    }

    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    return divCard;
  };
}

document.addEventListener("DOMContentLoaded", new TvMaze());
