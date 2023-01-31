
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();


app.get('/stock-data', async (req, res) => {
  const data = [];
  try {
    const res = await axios.get('https://www.dse.com.bd/latest_share_price_scroll_l.php');
    const $ = cheerio.load(res.data);
    
    $('.table-responsive.inner-scroll tr').each((i, el) => {
      const cells = $(el).find('td');
      if (cells.length) {
        const company = $(cells[0]).text().trim();
        const lastTrade = $(cells[1]).text().trim();
        const change = $(cells[2]).text().trim();
        const tradeVolume = $(cells[3]).text().trim();
        data.push({
          company,
          lastTrade,
          change,
          tradeVolume
        });
      }
    });
    console.log(data);
    
  } catch (error) {    
    console.error(error);
  }
  res.json({ data });
});

app.listen(3000, () => {
  console.log('API is running on http://localhost:3000');
});

