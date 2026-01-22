# leboncoincoin
SQL-backend

|leboncoin-backend/
├── src/
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── category.model.js
│   │   └── annonce.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   └── annonce.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   └── annonce.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   └── validations/
│       ├── auth.validation.js
│       └── annonce.validation.js
├── .env