import { pool } from "../db.js";

export const getUsers = async (req, res) => {

    const { rows } = await pool.query('SELECT * FROM users')

    res.json(rows)
}

export const getUser = async (req, res) => {
    const id = req.params.id
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    if (rows.length === 0) return res.status(404).json({ msg: 'user not found' })

    res.json(rows)

}

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
        res.send(result);

    } catch (error) {
       return res.status(500).json({message :error})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { rows, rowCount } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])

    if (rowCount === 0) return res.status(404).json({ msg: 'user not found' })

    res.send(`eliminando id = ${id}`)
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    return res.json(result)
}