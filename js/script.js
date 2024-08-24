// TAB DATA API: ASSETS, EXCHANGES, CATEGORIES, HOLDINGS
const tabDataLoad = {
  tab1: false,
  tab2: false,
  tab3: false,
  tab4: false,
};

function openTab(event, tabName) {
  const tabContent = document.querySelectorAll(".tab-content");
  const tabButtons = document.querySelectorAll(".tab-button");

  tabContent.forEach((content) => (content.style.display = "none"));
  tabButtons.forEach((button) => button.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");

  if (!tabDataLoad[tabName]) {
    switch (tabName) {
      case "tab1":
        fetchAndDisplay(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true",
          ["asset-list"],
          displayAssets,
          tabName,
          "Crypto_Data"
        );
        break;

      case "tab2":
        fetchAndDisplay(
          "https://api.coingecko.com/api/v3/exchanges",
          ["exchange-list"],
          displayExchange,
          tabName,
          "Exchange_Data"
        );
        break;

      case "tab3":
        fetchAndDisplay(
          "https://api.coingecko.com/api/v3/coins/categories",
          ["category-list"],
          displayCategories,
          tabName,
          "Categories_Data"
        );
        break;

      case "tab4":
        fetchAndDisplay(
          "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
          ["company-list"],
          displayCompanies,
          tabName,
          "Companies_Data"
        );
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".tab-button").click();
  fetchData();
});

//////////////////////////////////////////////////////////////////////////////

async function fetchData() {
  await Promise.all([
    fetchAndDisplay(
      "https://api.coingecko.com/api/v3/search/trending",
      ["coins-listID", "nfts-listID"],
      displayTrends,
      null,
      "Trending_Data"
    ),

    fetchAndDisplay(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true",
      ["asset-list"],
      displayAssets,
      null,
      "Crypto_Data"
    ),
  ]);
}

async function fetchAndDisplay(
  url,
  idsToToggle,
  displayFunction,
  tabName = null,
  localKey
) {
  idsToToggle.forEach((id) => {
    const errorElement = document.getElementById(`${id}-error`);

    if (errorElement) {
      errorElement.style.display = "none";
    }
    toggleSpinner(id, `${id}-spinner`, true);
  });

  const localStorageKey = localKey;
  const localData = getLocalStorageData(localStorageKey);

  if (localData) {
    idsToToggle.forEach((id) => toggleSpinner(id, `${id}-spinner`, false));
    displayFunction(localData);

    if (tabName) {
      tabDataLoad[tabName] = true;
    }
  } else {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("API limit reached");
      const data = await response.json();
      idsToToggle.forEach((id) => toggleSpinner(id, `${id}-spinner`, false));
      displayFunction(data);
      setLocalStorageData(localStorageKey, data);

      if (tabName) {
        tabDataLoad[tabName] = true;
      }
    } catch (error) {
      idsToToggle.forEach((id) => {
        toggleSpinner(id, `${id}-spinner`, false);
        document.getElementById(`${id}-error`).style.display = "block";
      });
      if (tabName) {
        tabDataLoad[tabName] = false;
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////

function displayTrends(data) {
  displayTrendCoins(data.coins.slice(0, 5));
  displayTrendNfts(data.nfts.slice(0, 5));
}

function displayTrendCoins(coins) {
  const coinTable = document.getElementById("coins-listID");
  coinTable.innerHTML = "";
  const table = createTable(["Coin", "Price", "Market Cap", "Volume", "24h%"]);

  coins.forEach((coin) => {
    const coinData = coin.item;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td class="name-column table-fixed-column"> <img src="${
      coinData.thumb
    }" alt="${coinData.name}"/> ${coinData.name}
    <span>(${coinData.symbol.toUpperCase()})</span></td>
    <td>${parseFloat(coinData.price_btc).toFixed(6)}</td>
    <td>${coinData.data.market_cap}</td>
    <td>${coinData.data.total_volume}</td>
    <td class="${
      coinData.data.price_change_percentage_24h.gbp >= 0 ? "green" : "red"
    }">${coinData.data.price_change_percentage_24h.gbp.toFixed(2)}%</td>
    `;
    // console.log(coinData.name);
    // console.log(coinData.thumb);
    // console.log(coinData.symbol.toUpperCase());
    // console.log(parseFloat(coinData.price_btc).toFixed(6));
    // console.log(coinData.data.market_cap);
    // console.log(coinData.data.total_volume);
    // console.log(coinData.data.price_change_percentage_24h.gbp);

    row.onclick = () =>
      (window.location.href = `../pages/coins.html?coin=${coinData.id}`);
    table.appendChild(row);
  });
  coinTable.appendChild(table);
}
