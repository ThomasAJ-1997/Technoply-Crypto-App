"use strict";
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
          "https://pro-api.coingecko.com/api/v3/coins/market?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true",
          ["asset-list"],
          displayAssets,
          tabName,
          "Crypto_Data"
        );
        break;

      case "tab2":
        fetchAndDisplay(
          "https://pro-api.coingecko.com/api/v3/exchanges",
          ["exchange-list"],
          displayExchange,
          tabName,
          "Exchanges_Data"
        );
        break;

      case "tab3":
        fetchAndDisplay(
          "https://pro-api.coingecko.com/api/v3/coins/categories",
          ["categories-list"],
          displayCategories,
          tabName,
          "Categories_Data"
        );
        break;

      case "tab4":
        fetchAndDisplay(
          "https://pro-api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
          ["company-list"],
          displayCompanies,
          tabName,
          "Companies_Data"
        );
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tab-button").click();
  fetchData();
});
//////////////////////////////////////////////////////////////////
// FETCH DATA FOR TABS

async function fetchData() {
  await Promise.all([
    fetchAndDisplay(
      "https://pro-api.coingecko.com/api/v3/search/trending",
      ["coins-listID", "nfts-listID"],
      displayTrends,
      null,
      "Trending_data"
    ),
    fetchAndDisplay(
      "https://pro-api.coingecko.com/api/v3/coins/market?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true",
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
  // If local storage data exists in thr application.
  if (localData) {
    idsToToggle.forEach((id) => toggleSpinner(id, `${id}-spinner`, false));
    displayFunction(localData);

    if (tabName) {
      // Setting the tab data as loaded, if not loaded (API error msg) with clicking and attempt to fetch again, else nothing will happen.
      tabDataLoad[tabName] = true;
    }
  } else {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API limit reached`);
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
