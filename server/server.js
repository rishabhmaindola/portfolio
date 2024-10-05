const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { connectToMongo } = require('./db/mongoDb');


dotenv.config();

const app = express();
connectToMongo();

const port = process.env.PORT;
// const corsOptions = {
//     origin: 'http://localhost:5173/',
//     methods: ["POST", "GET", "PUT", "DELETE"]
// };

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

const blogRoutes = require('./routes/blogRoutes');
const formRoutes = require('./routes/formRoutes');
const tagsRoutes = require('./routes/tagsRoute');
const notificationsRoute = require('./routes/notificationsRoute');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

app.use('/api/v1', blogRoutes);
app.use('/api/v1', formRoutes);
app.use('/api/v1', tagsRoutes);
app.use('/api/v1', notificationsRoute);
app.use('/api/v1', projectRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', skillRoutes);

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(port, () => {
    console.log(`server is live on port ${port}`)
});