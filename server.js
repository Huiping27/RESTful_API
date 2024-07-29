const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a route to get a list of items
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

app.get('/api/items', (req, res) => {
    res.json(items);
});

// Define a route to get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Define a route to add a new item
app.post('/api/items', (req, res) => {
    const item = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(item);
    res.status(201).json(item);
});

// Define a route to update an item by ID
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.json(item);
});

// Define a route to delete an item by ID
app.delete('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    const index = items.indexOf(item);
    items.splice(index, 1);

    res.json(item);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
