"use strict";

const coinsCount = document.getElementById("coinsID");
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
      .catch((error) => {});
  }
}
//////////////////////////////////////////////////////////////////////////////////////
