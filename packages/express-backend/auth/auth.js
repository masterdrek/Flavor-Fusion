import { getUsers, getUserByUsername, addUser } from '../services/user-services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()




const generateAccessToken = (username) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            `${process.send.JWT_KEY}`,
            { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(token)
                    }
                }
        )
    })
}

export const registerUser = async (req, res) => {
    const { name, username, password } = req.body
    const usernameTaken = await getUserByUsername(username)

    if ( !name || !username || !password ) {
        res.status(400).send("Bad request: Invalid input data.")
    } else if (usernameTaken) { 
        res.status(409).send("Username already taken.")
    } else {
        bcrypt // encryption
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt)) // hashes pwd
            .then((hashedPwd) => {
                generateAccessToken(username).then((token) => {
                    const newUser = [
                        name.toUpperCase(),
                        username,
                        hashedPwd
                    ]
                    addUser(...newUser) // add new user
                    res.status(201).send({ token: token }) // creates/sends token
                })
            })
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await getUserByUsername(username)

    if (!user) {
        // invalid username
        res.status(401).send('Unauthorized')
    } else {
        bcrypt
            .compare(password, user.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then((token) => {
                        res.status(200).send({ token: token })
                    })
                } else {
                    res.status(401).send('Unauthorized')
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized")
            })
    }
}

export const authenticateUser = (req, res, next ) => {
    const authHeader = req.headers['authorization']
    // Getting second part of auth header (getting the token)
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        console.log('No token recieved.')
    } else {
        jwt.verify(
            token,
            `${process.env.JWT_KEY}`,
            async (error, decoded) => {
                const { username } = decoded
                const user = await getUserByUsername(username)
                if (user) {
                    console.log('Decoded!')
                    next()
                } else {
                    console.log('User not found')
                    res.status(400).end()
                }
            }
        )
    }
}
