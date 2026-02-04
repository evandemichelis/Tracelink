const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "joan",
  host: "localhost",
  database: "ageimpulse",
  password: "jojoxy",
  port: 5432,
});

app.use(
  cors({
    origin: "http://172.16.27.166:8081",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, password, status } = req.body;
  try {
    if (status === "Producteur") {
      await pool.query(
        "INSERT INTO producteurs (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, email, password]
      );
    } else if (status === "Transporteur") {
      await pool.query(
        "INSERT INTO transporteurs (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, email, password]
      );
    } else if (status === "Client") {
      await pool.query(
        "INSERT INTO utilisateurs (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, email, password]
      );
    }

    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ message: "Impossible de créer le compte utilisateur" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let result = await pool.query(
      "SELECT id, firstname, lastname, email, password, 'Client' AS status FROM utilisateurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    result = await pool.query(
      "SELECT id, firstname, lastname, email, password, 'Producteur' AS status FROM producteurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    result = await pool.query(
      "SELECT id, firstname, lastname, email, password, 'Transporteur' AS status FROM transporteurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

app.post("/api/addObject", async (req, res) => {
  const {
    barrecode,
    serialNumber,
    hardwareVersion,
    firmwareVersion,
    formattedDate,
    lotNumber,
    destination,
    client,
  } = req.body;

  try {
    const existingLot = await pool.query(
      "SELECT id, objects_number FROM lots WHERE lot_number = $1",
      [lotNumber]
    );

    let lotId;

    if (existingLot.rows.length > 0) {
      lotId = existingLot.rows[0].id;
      objectNumber = existingLot.rows[0].objects_number;
    } else {
      const newLot = await pool.query(
        "INSERT INTO lots (lot_number, objects_number, production_date, destination, client) VALUES ($1, 0, $2, $3, $4) RETURNING id",
        [lotNumber, formattedDate, destination, client]
      );
      lotId = newLot.rows[0].id;
      objectNumber = 0;
    }

    await pool.query(
      "INSERT INTO objets (barrecode, serial_number, hardware_version, firmware_version, creation_date, lot_number) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        barrecode,
        serialNumber,
        hardwareVersion,
        firmwareVersion,
        formattedDate,
        lotNumber,
      ]
    );

    await pool.query(
      "UPDATE lots SET objects_number = objects_number + 1, objects = array_append(objects, $1), production_date = $2 WHERE id = $3",
      [serialNumber, formattedDate, lotId]
    );

    res.status(201).json({ message: "Objet ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'objet:", error);
    res.status(500).json({ message: "Impossible d'ajouter l'objet" });
  }
});

app.put("/api/updateLot", async (req, res) => {
  const {
    lotNumber,
    transporterName,
    transporterFirstname,
    transporterLastname,
    receptionDate,
  } = req.body;

  try {
    await pool.query(
      "UPDATE lots SET transporteur = $1, recuperation_date = $2 WHERE lot_number = $3",
      [transporterName, receptionDate, lotNumber]
    );

    await pool.query(
      "UPDATE transporteurs SET number_recupered_lot = number_recupered_lot + 1 WHERE firstname = $1 AND lastname = $2",
      [transporterFirstname, transporterLastname]
    );

    await pool.query(
      "UPDATE transporteurs SET recupered_lots = array_append(recupered_lots, $1) WHERE firstname = $2 AND lastname = $3",
      [lotNumber, transporterFirstname, transporterLastname]
    );

    res
      .status(200)
      .json({ message: "Données du lot mises à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données du lot:", error);
    res
      .status(500)
      .json({ message: "Impossible de mettre à jour les données du lot" });
  }
});

app.get("/api/userLots/:transporterId", async (req, res) => {
  const { transporterId } = req.params;

  try {
    const userLots = await pool.query(
      "SELECT recupered_lots FROM transporteurs WHERE id = $1",
      [transporterId]
    );

    if (userLots.rows.length > 0) {
      const recupered_lot = userLots.rows[0].recupered_lots;
      res.status(200).json({ recupered_lot });
    } else {
      res
        .status(404)
        .json({ message: "Aucun lot trouvé pour cet utilisateur" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des lots de l'utilisateur:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des lots de l'utilisateur",
    });
  }
});

app.get("/api/lotInfo/:lotNumber", async (req, res) => {
  const { lotNumber } = req.params;

  try {
    const lotInfo = await pool.query(
      "SELECT * FROM lots WHERE lot_number = $1",
      [lotNumber]
    );

    if (lotInfo.rows.length > 0) {
      res.status(200).json(lotInfo.rows[0]);
    } else {
      res
        .status(404)
        .json({ message: `Aucun lot trouvé avec le numéro ${lotNumber}` });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du lot:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des informations du lot",
    });
  }
});

app.get("/api/checkScannedLot/:lotNumber", async (req, res) => {
  const { lotNumber } = req.params;

  try {
    const lot = await pool.query(
      "SELECT recuperation_date FROM lots WHERE lot_number = $1",
      [lotNumber]
    );

    if (lot.rows.length > 0) {
      const receivedDate = lot.rows[0].recuperation_date;

      if (receivedDate) {
        res.status(200).json({ hasReceivedDate: true });
      } else {
        res.status(200).json({ hasReceivedDate: false });
      }
    } else {
      res.status(404).json({ error: "Aucun lot trouvé avec ce numéro" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la date de récupération du lot:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la vérification de la date de récupération du lot",
    });
  }
});

app.put("/api/deliveredLot", async (req, res) => {
  const { lotNumber, transporterId } = req.body;

  try {
    await pool.query(
      "UPDATE lots SET delivery_date = CURRENT_DATE WHERE lot_number = $1",
      [lotNumber]
    );

    await pool.query(
      "UPDATE transporteurs SET number_delivered_lot = number_delivered_lot + 1 WHERE id = $1",
      [transporterId]
    );

    await pool.query(
      "UPDATE transporteurs SET delivered_lots = array_append(delivered_lots, $1) WHERE id = $2",
      [lotNumber, transporterId]
    );

    res.status(200).json({ message: "Lot marqué comme livré avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du lot livré:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du lot livré" });
  }
});

app.put("/api/updateObjectUser", async (req, res) => {
  const { barrecode, user, firstname, lastname, activation } = req.body;

  try {
    await pool.query(
      "UPDATE objets SET utilisateur = $1 WHERE barrecode = $2",
      [user, barrecode]
    );

    const today = new Date();
    const renewalDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    await pool.query(
      "UPDATE utilisateurs SET serial_number_object = $1, renewal_date = $2, activation = $5 WHERE firstname = $3 AND lastname = $4",
      [barrecode, renewalDate, firstname, lastname, activation]
    );

    res
      .status(200)
      .json({ message: "Mise à jour de l'utilisateur de l'objet réussie" });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur de l'objet:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'utilisateur de l'objet",
    });
  }
});

app.get("/api/userObject/:user", async (req, res) => {
  const { user } = req.params;

  try {
    const userObject = await pool.query(
      "SELECT * FROM objets WHERE utilisateur = $1",
      [user]
    );

    if (userObject.rows.length > 0) {
      res.status(200).json(userObject.rows[0]);
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'utilisateur:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des données de l'utilisateur",
    });
  }
});

app.get("/api/objectDetails/:serialNumber", async (req, res) => {
  const { serialNumber } = req.params;

  try {
    const objectDetails = await pool.query(
      "SELECT * FROM objets WHERE serial_number = $1",
      [serialNumber]
    );

    if (objectDetails.rows.length > 0) {
      res.status(200).json(objectDetails.rows[0]);
    } else {
      res
        .status(404)
        .json({ message: "Aucun objet trouvé avec ce numéro de série" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'objet:",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des détails de l'objet" });
  }
});

const PORT = process.env.PORT || 6666;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
