import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { getCommodities } from './controllers/commodities.mjs';
import { getGainers, getLosers, getActiveStocks } from './controllers/gainers_losers.mjs';
import { symbol_search } from './controllers/symbol-search.mjs';
import { company_overview } from './controllers/company-overview.mjs';
import { searchTickers } from './controllers/ticker_search.mjs';
import { get_stock_news } from './controllers/stock-news.mjs';
import getIPOCalendar from './controllers/ipo_calender.mjs';
import getAlphaVantageData from './controllers/your-stocks.mjs';
import active_listing from './controllers/listing_status.mjs'; // Import your new controller
import delisting_stocks from './controllers/delisting_stocks.mjs'; // Import your new controller
import fetchEarningsData from './controllers/earning_calendar.mjs';
import historical_data from './controllers/historical_data.mjs';
import insider_transactions from './controllers/insider_transactions.mjs';

import os from 'os';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.options('*', cors()); // Handle preflight requests for all routes

// Middleware
app.use(express.json());

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)

}));


// Other routes
app.get('/', (req, res) => {
  res.send('<h1>This is the homepage</h1>');
});

app.get('/active-stocks', getActiveStocks);
app.get('/gainer-stocks', getGainers);
app.get('/loser-stocks', getLosers);
app.get('/top_stocks', getCommodities);
app.get('/search', searchTickers);
app.get('/symb-search', symbol_search);
app.get('/overview', company_overview);
app.get('/stock-news',get_stock_news);
app.get('/ipo-calendar',getIPOCalendar);
app.get('/stocks-list',getAlphaVantageData);
app.get('/listed-stocks', active_listing);
app.get('/delisted-stocks', delisting_stocks);
app.get('/earnings-calendar', fetchEarningsData);
app.get('/historical-data', historical_data);
app.get('/insider_transactions', insider_transactions);

const PORT = process.env.PORT || 4848;
app.listen(PORT, () => {
  const localUrl = `http://localhost:${PORT}`;
  const localNetworkUrl = `http://${getLocalIPAddress()}:${PORT}`;
  console.log(`Server is running on:`);
  console.log(`- Local: ${localUrl}`);
  console.log(`- Local Network: ${localNetworkUrl}`);
});

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (let iface in networkInterfaces) {
    for (let alias of networkInterfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}
