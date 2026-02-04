import {
  getAllCategories,
  create,
  byid,
  updateCategoryById,
  deleteById,
} from "../models/category.model.js";
import { categorySchema } from "../validations/category.validation.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.json(categories);
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des categoies dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la recuperation des categoires ",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Le npom de la categorie est requis " });
    }

    const { error } = categorySchema.validate({ name });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    await create(name);
    res.status(201).json({ message: "Categorie créé " });
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des categoies dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la creation des categoires ",
    });
  }
};

// recuperer une categorie par son id

export const getcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await byid(id);

    if (!category) {
      return res.status(400).json({ message: "Aucune categorie trouvé " });
    }
    res.json(category);
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des categoies dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la creation des categoires ",
    });
  }
};

// Update une catgorie

export const updatecategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "aucune categrie trouvé " });
    }

    const { error } = categorySchema.validate({ name });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const affectRows = await updateCategoryById(id, name);

    if (affectRows) {
      return res.status(404).json({ message: "Aucune categorie trouvé " });
    }

    res.json({ message: "catégorie mise a jour avec success  ", name });
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des categoies dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la creation des categoires ",
    });
  }
};

// Suppprimer une categorie

export const deleteCategoryByid = async (req, res) => {
  try {
    const { id } = req.params;

    const affectRows = await deleteById(id);

    if (affectRows) {
      return res.status(404).json({ message: "aucune categorie trouvée " });
    }

    res.json({ message: "categorie supprimé " });
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des categoies dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la suppression des categoires ",
    });
  }
};
