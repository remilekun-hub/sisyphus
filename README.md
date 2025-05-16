# React Vite TypeScript Project

An exchange platform application built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

This project uses the **Binance API**, which may be restricted in certain countries. **Please ensure you are connected to a VPN** before running the app and always stay connected to the vpn to use th app.

---

## ⚠️ Important Note

> Binance is not supported in some regions (e.g., the US or certain European countries).  
> **Always use a VPN before installing dependencies (`npm install`) or making API requests.**

---

## 🚀 Quick Start

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher recommended)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   A reliable **VPN** connection (required for Binance API access)

### 1. Install Dependencies

Using **npm**:

npm install

### 2. Connect to a VPN

Ensure you're connected to a VPN before continuing. This step is **required** to successfully install packages and access Binance APIs.


### 3. START the App
npm run dev

- on Login, user details and profile image(gravatar) is saved in the local storage and you're redirected moved to the exchange page

- binance base url 'https://api.binance.com'

-markets list are gotten from "https://api.binance.com/api/v3/exchangeInfo" but doesnt come with the image, there's another way but theres not alot of time to implement

-order books data are gotten from websocket connection wss://stream.binance.com:9443/ws/${lowerSymbol}@depth${limit}@1000ms`; where {lowersymbol} is your symbol in lowercase, {limit} the order limit

-couldn't do the mobile screens coz theere was no time.
