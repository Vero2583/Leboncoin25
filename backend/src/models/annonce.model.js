import db from "../config/db.js";

export const getAllAnnonces = async () => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM annonces ORDER BY created_at DESC",
    );
    return rows;
  } catch (error) {
    console.error("erreur lors de la recuperation des annonces", error.message);
    throw error;
  }
};

// Creer une annonce

export const createAnnonce = async (data) => {
  try {
    await db.query(
      "INSERT INTO annonces (title, price, city, image, idusers, idcategories, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [
        data.title,
        data.price,
        data.city,
        data.image,
        data.idusers,
        data.idcategories,
      ],
    );
  } catch (error) {
    console.error(
      "Erreur lors de la creation des annonces coté model:",
      error.message,
    );
    throw error;
  }
};

export const updateAnnonceById = async (id, data) => {
  try {
    await db.query(
      `UPDATE annonces SET title = ?, price = ?, city = ?, image = ?, idcategories = ?, WHERE id= ?`,
      [data.title, data.price, data.city, data.image, data.idcategories, id],
    );
    return rows[0] || null;
  } catch (error) {
    console.error(
      "erreur lors de l'update des annonces coté model:",
      error.message,
    );
    throw error;
  }
};

export const deleteAnnonceById = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM annonces WHERE id = id`, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      "erreur lors de la suppression des annonces coté model:",
      error.message,
    );
    throw error;
  }
};
