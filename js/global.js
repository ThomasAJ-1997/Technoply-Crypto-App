const coinsCount = document.getElementById("coinsID");
const exchangeCount = document.getElementById("exchangeID");
const marketCount = document.getElementById("marketID");
const marketChangeCount = document.getElementById("marketChangeID");
const volume = document.getElementById("volumeID");
const dominance = document.getElementById("dominanceID");
//////////////////////////////////////////////////////////////////////////////////////
// LOCAL STORAGE AND COINGECKO API

document.addEventListener("DOMContentLoaded", function () {
  // const themeToggle = document.getElementById("lightAndDarkModeToggleID");
  // const p_elements = Array.from(document.getElementsByTagName("p"));
  // const h3_elements = Array.from(document.getElementsByTagName("h3"));
  // const a_elements = Array.from(document.getElementsByTagName("a"));
  // const i_elements = Array.from(document.getElementsByTagName("i"));
  // const form_elements = Array.from(document.getElementsByTagName("form"));
  // const input_elements = Array.from(document.getElementsByTagName("input"));
  // const td_elements = Array.from(document.getElementsByTagName("td"));
  // const body = document.body;

  // const savedTheme = localStorage.getItem("theme");
  // if (savedTheme) {
  //   body.id = savedTheme;
  //   updateIcon(savedTheme);
  // }

  // themeToggle.addEventListener("click", () => {
  //   if (body.id === "light-theme") {
  //     body.id = "dark-theme";
  //     localStorage.setItem("theme", "dark-theme");
  //     body.style.background = "#090014";
  //     document.querySelector("nav").style.background = "#130138";
  //     document.querySelector("footer").style.background = "#130138";

  //     p_elements.map((p_elements) => {
  //       p_elements.style.color = "white";
  //     });
  //     h3_elements.map((h3_elements) => {
  //       h3_elements.style.color = "white";
  //     });
  //     a_elements.map((a_elements) => {
  //       a_elements.style.color = "white";
  //     });
  //     i_elements.map((i_elements) => {
  //       i_elements.style.color = "white";
  //       i_elements.style.background = "black";
  //       i_elements.style.borderColor = "black";
  //       i_elements.style.border = "1px";
  //     });

  //     input_elements.map((input_elements) => {
  //       input_elements.style.color = "white";
  //       input_elements.style.background = "#000";
  //       input_elements.style.borderColor = "black";
  //       input_elements.style.border = "1px";
  //     });

  //     form_elements.map((form_elements) => {
  //       form_elements.style.color = "white";
  //       form_elements.style.background = "#000";
  //       form_elements.style.borderColor = "black";
  //       form_elements.style.border = "1px";
  //     });

  //     const th = document.querySelectorAll("th");
  //     for (let cell of th) {
  //       cell.style.color = "#bebebe";
  //     }

  //     const td = document.querySelectorAll("td");
  //     for (let cell of td) {
  //       cell.style.color = "#bebebe";
  //     }

  //     const fixed = document.querySelectorAll(".table-fixed-column");
  //     for (let cell of fixed) {
  //       cell.style.background = "#130138";
  //     }

  //     const trending = document.querySelectorAll(".trending-container");
  //     for (let cell of trending) {
  //       cell.style.background = "#130138";
  //     }

  //     const tab = document.querySelectorAll(".tab-container");
  //     for (let cell of tab) {
  //       cell.style.background = "#130138";
  //     }

  //     const tabs = document.querySelectorAll(".tabs");
  //     for (let cell of tabs) {
  //       cell.style.background = "#090014";
  //     }

  //     const buttons = document.querySelectorAll(".tab-button");
  //     for (let cell of buttons) {
  //       cell.style.color = "#bebebe";
  //     }

  //     updateIcon("dark-theme");
  //   } else {
  //     body.id = "light-theme";
  //     localStorage.setItem("theme", "light-theme");
  //     body.style.background = "#eee";
  //     document.querySelector("nav").style.background = "#fff";
  //     document.querySelector("footer").style.background = "#fff";

  //     p_elements.map((p_elements) => {
  //       p_elements.style.color = "black";
  //     });

  //     h3_elements.map((h3_elements) => {
  //       h3_elements.style.color = "black";
  //     });
  //     a_elements.map((a_elements) => {
  //       a_elements.style.color = "black";
  //     });
  //     td_elements.map((td_elements) => {
  //       td_elements.style.color = "black";
  //     });
  //     i_elements.map((i_elements) => {
  //       i_elements.style.color = "black";
  //       i_elements.style.background = "#eee";
  //       i_elements.style.borderColor = "white";
  //       i_elements.style.border = "1px";
  //     });
  //     input_elements.map((input_elements) => {
  //       input_elements.style.color = "black";
  //       input_elements.style.background = "#eee";
  //       input_elements.style.borderColor = "white";
  //       input_elements.style.border = "1px";
  //     });

  //     form_elements.map((form_elements) => {
  //       form_elements.style.color = "black";
  //       form_elements.style.background = "#eee";
  //       form_elements.style.borderColor = "white";
  //       form_elements.style.border = "1px";
  //     });

  //     const th = document.querySelectorAll("th");
  //     for (let cell of th) {
  //       cell.style.color = "black";
  //     }

  //     const td = document.querySelectorAll("td");
  //     for (let cell of td) {
  //       cell.style.color = "black";
  //     }

  //     const fixed = document.querySelectorAll(".table-fixed-column");
  //     for (let cell of fixed) {
  //       cell.style.background = "#eff2f5";
  //     }

  //     const trending = document.querySelectorAll(".trending-container");
  //     for (let cell of trending) {
  //       cell.style.background = "#eff2f5";
  //     }

  //     const tab = document.querySelectorAll(".tab-container");
  //     for (let cell of tab) {
  //       cell.style.background = "#eff2f5";
  //     }

  //     const tabs = document.querySelectorAll(".tabs");
  //     for (let cell of tabs) {
  //       cell.style.background = "#eff2f5";
  //     }

  //     const buttons = document.querySelectorAll(".tab-button");
  //     for (let cell of buttons) {
  //       cell.style.color = "black";
  //     }
  //   }
  // });

  // function updateIcon() {
  //   themeToggle.classList.add("ri-moon-fill");
  // }
  fetchGlobal();
});
// Function: Reads data from the local Sotrage besides if?
function getLocalStorageData(key) {
  const storeData = localStorage.getItem(key);
  if (!storeData) return null;

  const parsedData = JSON.parse(storeData);
  const currentTime = Date.now();
  if (currentTime - parsedData.timestamp > 300000) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedData.data;
}

function setLocalStorageData(key, data) {
  const storeData = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem(key, JSON.stringify(storeData));
}

function fetchGlobal() {
  const localStorageKey = "Global_Data";
  const localData = getLocalStorageData(localStorageKey);

  if (localData) {
    displayGlobalData(localData);
  } else {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch("https://api.coingecko.com/api/v3/global", options)
      .then((response) => response.json())
      .then((data) => {
        const globalData = data.data;
        displayGlobalData(data);
        setLocalStorageData(localStorageKey, globalData);
      })
      .catch((error) => {
        coinsCount.textContent = "N/A";
        exchangeCount.textContent = "N/A";
        marketCount.textContent = "N/A";
        marketChangeCount.textContent = "N/A";
        volume.textContent = "N/A";
        dominance.textContent = "BTC N/A% - ETH N/A%";
        console.error(error);
      });
  }
}

function displayGlobalData(globalData) {
  coinsCount.textContent = globalData.active_cryptocurrencies || "N/A";
  exchangeCount.textContent = globalData.markets || "N/A";

  marketCount.textContent = globalData.total_market_cap?.gbp
    ? `££${(globalData.total_market_cap.gbp / 1e12).toFixed(3)}T`
    : "N/A";

  const marketCapChange = globalData.market_cap_change_percentage_24h_usd;
  // No GDP option for public API: InnerHTML and icon change depending on the Market Cap %
  if (marketCapChange !== undefined) {
    const changeText = `${marketCapChange.toFixed(1)}%`;
    marketChangeCount.innerHTML = `${changeText} <i class="${
      marketCapChange < 0 ? "red" : "green"
    } ri-arrow-${marketCapChange < 0 ? "down" : "up"}-s-fill"></i>`;
    marketChangeCount.style.color = marketCapChange < 0 ? "red" : "green";
  } else {
    marketChangeCount.textContent = "N/A";
  }

  volume.textContent = globalData.total_volume?.gbp
    ? `£${(globalData.total_volume.gbp / 1e9).toFixed(3)}B`
    : "N/A";

  const btcDominance = globalData.market_cap_percentage?.btc
    ? `${globalData.market_cap_percentage.btc.toFixed(1)}%`
    : "N/A";

  const ethDominance = globalData.market_cap_percentage?.eth
    ? `${globalData.market_cap_percentage.eth.toFixed(1)}%`
    : "N/A";

  dominance.textContent = `BTC ${btcDominance} - ETH ${ethDominance}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function toggleSpinner(listId, spinnerId, show) {
  const listElement = document.getElementById(listId);
  const spinnerElement = document.getElementById(spinnerId);

  if (spinnerElement) {
    spinnerElement.style.display = show ? "block" : "none";
  }

  if (listElement) {
    listElement.style.display = show ? "none" : "block";
  }
}

function createTable(headers, fixIndex = 0) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  table.appendChild(thead);

  const headerRow = document.createElement("tr");
  headers.forEach((header, index) => {
    const th = document.createElement("th");
    th.textContent = header;

    if (index === fixIndex) {
      th.classList.add("table-fixed-column");
    }
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  return table;
}

/////////////////////////////////////////////////////////////////
