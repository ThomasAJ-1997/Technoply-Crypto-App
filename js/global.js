"use strict";

const coinsCount = document.getElementById("coinsID");
const exchangeCount = document.getElementById("exchangeID");
const marketCount = document.getElementById("marketID");
const marketChangeCount = document.getElementById("marketChangeID");
const volume = document.getElementById("volumeID");
const dominance = document.getElementById("dominanceID");
//////////////////////////////////////////////////////////////////////////////////////
// LOCAL STORAGE AND COINGECKO API

document.addEventListener("DOMContentLoaded", function () {
  fetchGlobal();
});
// Function: Reads data from the local Sotrage besides if?
function getLocalStorageData(key) {
  const storeData = localStorage.getItem(key);
  if (!storeData) return null;

  const parsedData = JSON.parse(storeData);
  const currentTime = Date.now();
  // The data is older than five mins - fetch it again.
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
/////////////////////////////////////////////////////////////////////////////////////
