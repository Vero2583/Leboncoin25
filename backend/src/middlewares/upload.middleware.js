import multer from "multer"

// configuration de stockage de l'image 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

// filtrage

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error ('Seul les medias de type image sont autorisés'), false)
    }
}

// exporter le middleware muter pret

export const upload = multer({
    storage, fileFilter,
    limits: {fileSize: 20 * 1024 * 1024} // limite 20 MO par fichiers
})