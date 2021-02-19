const { Pool } = require('pg')
const pool = new Pool({
  connectionString:process.env.DATABASE_URL
})
.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM business_appoint');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
module.exports = {
  query: (text, params) => pool.query(text, params),
}