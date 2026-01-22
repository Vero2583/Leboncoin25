import db  from "../config/db.js"

export const getAllAnnonces = async () => {
try {
    
    const [rows] = await db.query("SELECT * FROM annonces ORDER BY created_at DESC",);
    return rows

} catch (error) {
    console.error("erreur lors de la recuperation des annonces", error.message);
    throw error;
}
};

export const createAnnonce = async (data) => {
    try {
        
        await db.query("INSERT INTO annonces (title, price, city, image, user_id, category_id, created_at) VALUES (?, ?; ?, ?, ?, ?, NOW())", [
            data.title,
            data.price,
            data.city,
            data.image,
            data.user_id,
            data.category_id
        ])

    } catch (error) {

        console.error("Erreur lors de la creation des annonces coté model:", error.message );
        throw error
        
    }
}


export const updateAnnonceById = async (Id, data) => {
    try {
        
        const [rows] = await db.query("SELECT * FROM annonces WHERE id= ?", [id]);
        return rows[0] || null;


    } catch (error) {
        console.error(
            "erreur lors de l'update des annonces coté model:",
            error.message
        );
        throw error
    }
}