import db from "../config/db.js"

// recupere toutes les categories

export const getAllCategories = async () => {
    try {
        
        const [rows] = await db.query("SELECT * FROM categories")
        return rows

    } catch (error) {
        console.error("erreur lors de la recuperation des categories", error.message);
        throw error
    }
}
// creer une categories

export const create = async (name) => {
    try {
        
        await db.query('INSERT INTO categories (name) VALUES (?)', [name])

    } catch (error) {
        console.error("erreur lors de la creation des categories", error.message)
        throw error
    }
}

//Afficher par id

export const byid = async (id) => {
    try {
        
        const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id])
        return rows[0]

    } catch (error) {
        console.error("erreur lors de l'affichage id  des categories", error.message)
        throw error
    }
    
}

// Mettre à jour une categories

export const updateCategoryById = async (id, name) => {
    try {
        
        const [result] = await db.query('UPDATE categories SET name = ? WHERE id= ?', [id, name])
        return result.affectRows

    } catch (error) {
        console.error("erreur lors de la mise à jour id  des categories", error.message)
        throw error
    }
}

// supprimer une categories

export const deleteById = async(id) => {
    try {
        
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id])
        return result.affectRows

    } catch (error) {
        console.error("erreur lors de la suppression  des categories", error.message)
        throw error
    }
}