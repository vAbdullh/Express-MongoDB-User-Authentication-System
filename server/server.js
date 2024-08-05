require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const { hashPassword, compareHashedPassword, checkName, checkUsername } = require('./functions')
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model for the admin collection
const User = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user' // Default role is 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current date and time
    },
    shouldExpire: {
        type: Boolean,
        default: true // Set to null by default; can be updated as needed
    }
});

const users = mongoose.model('users', User);

app.get('/', async (req, res) => {
    return res.send(await users.find({}))
})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await users.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.json({
                status: false,
                message: 'Oops! It seems like your username or password is incorrect. Please double-check and try again.'
            });
        }
        const match = await compareHashedPassword(password, user.password)

        if (match) {
            return res.json({
                status: true,
                message: `Welcome again '${user.name}'`,
                name: user.name
            });
        }

        return res.json({
            status: false,
            message: 'Oops! It seems like your username or password is incorrect. Please double-check and try again.'
        });

    } catch (error) {
        console.error('Error during login:', error);

        return res.status(500).json({
            status: false,
            message: 'Server error, try again later!'
        });
    }
});

app.post('/create', async (req, res) => {
    const { name, username, password, role = 'user' } = req.body;

    const isUsernameValid = checkUsername(username);

    try {
        if (!isUsernameValid) return res.send({
            status: false,
            message: "Hmm, something\'s off with the username. Try using only letters, numbers, and underscores."

        })
        if (!checkName(name)) return res.send({
            status: false,
            message: "Whoops! Make sure the name has at least three letters and only alphabet characters—no special symbols!"
        })

        const hashedPassword = await hashPassword(password)

        const newUser = new users({
            role,
            name: name.trim().replace(/\s+/g, ' '),
            username,
            password: hashedPassword,
            createdAt: new Date(),
            shouldExpire: true
        });
        const isExist = await users.findOne({ username: username.toLowerCase() });
        if (isExist) return res.send({
            status: false,
            message: "This username\'s already taken. Time to get creative and try another one!"
        })
        await newUser.save();
        return res.json({
            status: true,
            message: "Account created! It will automatically expire after one hour."
        })
    } catch (error) {
        console.log(error);
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
