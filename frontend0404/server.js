const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3001;

// Swagger konfiguráció
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sakkozók Chess API',
      version: '1.0.1',
      description: 'Egyszerű Express API Swaggerrel és séma-tervvel',
      contact:  {
        name: 'Németh Bence',
        url: 'https://chess.sulla.hu',
        email: 'info@sulla.hu'
      }
    },
    servers: [
      {
        url: `http://localhost:3001`,
        description: 'Development server',
      },
    ],
  },
  apis: ['server.js'], // Fájl, ahol a Swagger dokumentáció leírása található
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware a JSON adatok kezeléséhez
app.use(bodyParser.json());
app.use(cors());

/**
 * @swagger
 * components:
 *  Chess:
 *    type: object
 *    properties: 
 *      name:
 *        type: string
 *        description: Név
 *        example: 'Példa'
 *      birth_date:
 *        type: string
 *        description: Szüldátum
 *        example: '1978-10-08'
 *      world_ch_won:
 *        type: number
 *        description: nyert versenyek száma
 *        example: 1
 *      profile_url:
 *        type: string
 *        description: profilra mutató link
 *        example: 'https://hu.wikipedia.org/wiki/Garry_Kasparov'
 *      image_url:
 *        type: string
 *        description: képre mutató link
 *        example: 'https://www.sulla.hu/Kasparov.jpg'
 *  schemas:
 *   Chess2:
 *    type: object
 *    properties: 
 *      id:
 *        type: integer
 *      name:
 *        type: string
 *      birth_date:
 *        type: string
 *      world_ch_won:
 *        type: integer
 *      profile_url:
 *        type: string
 *      image_url:
 *        type: string
 * 
 */


// Egyszerű memóriában tárolt adatbázis
let chess = [
  {	
    id: 1,
      name: "Garry Kasparov",
      birth_date: "1963-04-13",
      world_ch_won: 0,
      profile_url: "https://hu.wikipedia.org/wiki/Garry_Kasparov",
      image_url: "https://www.sulla.hu/Kasparov.jpg"
    },
    {
    id: 2,
      name: "Magnus Carlsen",
      birth_date: "1990-11-30",
      world_ch_won: 5,
      profile_url: "https://hu.wikipedia.org/wiki/Magnus_Carlsen",
      image_url: "https://www.sulla.hu/Carlsen.jpg"
    },
    {
    id: 3,
      name: "Bobby Fischer",
      birth_date: "1943-03-09",
      world_ch_won: 1,
      profile_url: "https://hu.wikipedia.org/wiki/Bobby_Fischer",
      image_url: "https://www.sulla.hu/Fischer.jpg"
    },
    {
    id: 4,
      name: "Viswanathan Anand",
      birth_date: "1969-12-11",
      world_ch_won: 5,
      profile_url: "https://hu.wikipedia.org/wiki/Viswanathan_Anand",
      image_url: "https://www.sulla.hu/Anand.jpg"
    },
    {
    id: 5,
      name: "Anatoly Karpov",
      birth_date: "1951-05-23",
      world_ch_won: 6,
      profile_url: "https://hu.wikipedia.org/wiki/Anatoly_Karpov",
      image_url: "https://www.sulla.hu/Karpov.jpg"
    },
    {
    id: 6,
      name: "Judit Polgár",
      birth_date: "1976-07-23",
      world_ch_won: 0,
      profile_url: "https://hu.wikipedia.org/wiki/Judit_Polg%C3%A1r",
      image_url: "https://www.sulla.hu/Polgar.jpg"
    },
     {
    id: 7,
      name: "Péter Lékó",
      birth_date: "1979-09-08",
      world_ch_won: 0,
      profile_url: "https://hu.wikipedia.org/wiki/L%C3%A9k%C3%B3_P%C3%A9ter",
      image_url: "https://www.sulla.hu/Leko.jpg"
    },
  // ... további adatok
];

let nextId = 8;
// CRUD műveletek

// Get all chess
/**
 * @swagger
 * /chess:
 *   get:
 *     summary: sakk bejegyzések lekérdezése
 *     description: Returns all chess
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/chess',cors(), (req, res) => {
  res.json(chess);
});

// Get chess by ID
/**
 * @swagger
 * /chess/{id}:
 *   get:
 *     summary: 1 db sakk bejegyzés lekérdezése
 *     description: Returns a single chess item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chess item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Chess2'
 *       404:
 *         description: chess not found
 */
app.get('/chess/:id', cors(), (req, res) => {
  const id = parseInt(req.params.id);
  const item = chess.find(item => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Create new chess
/**
 * @swagger
 * /chess:
 *   post:
 *     summary: új sakk bejegyzés készítése
 *     description: Creates a new chess item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Chess'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Chess2'
 *       500:
 *         description: Internal server error
 */
app.post('/chess', cors(), (req, res) => {
  const newItem = req.body;
  newItem.id = nextId;
  chess.push(newItem);
  nextId++;
  res.status(201).json(newItem);
});

// Update chess by ID
/**
 * @swagger
 * /chess/{id}:
 *   put:
 *     summary: sakk bejegyzés frissítése
 *     description: Updates a chess item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chess item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Chess'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Chess2'
 *       404:
 *         description: chess not found
 */
app.put('/chess/:id', cors(), (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = chess.findIndex(item => item.id === id);

  if (index !== -1) {
    chess[index] = { ...chess[index], ...updatedItem };
    res.json(chess[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Delete chess by ID
/**
 * @swagger
 * /chess/{id}:
 *   delete:
 *     summary: sakk bejegyzés törlese
 *     description: Deletes a chess item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chess item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Chess2'
 *       404:
 *         description: chess not found
 */
app.delete('/chess/:id', cors(), (req, res) => {
  const id = parseInt(req.params.id);
  const index = chess.findIndex(item => item.id === id);

  if (index !== -1) {
    const deletedItem = chess.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Indítás a megadott porton
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/swagger`);
});
