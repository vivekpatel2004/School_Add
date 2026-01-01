import express from "express";
import { db } from "../config/db.js";
import multer from "multer";
import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ===============================
   Multer Config
================================ */

const storage = multer.diskStorage({
  destination: "uploads/schoolImages",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ===============================
   ADD SCHOOL
================================ */

router.post(
  "/add",
  upload.single("image"),
  body("email_id").isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file.filename;

    db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "School added successfully" });
      }
    );
  }
);

/* ===============================
   UPDATE TEXT ONLY
================================ */

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, address, city, state, contact, email_id } = req.body;

  db.query(
    `UPDATE schools 
     SET name=?, address=?, city=?, state=?, contact=?, email_id=? 
     WHERE id=?`,
    [name, address, city, state, contact, email_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "School updated successfully" });
    }
  );
});

/* ===============================
   DELETE SCHOOL + IMAGE
================================ */

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT image FROM schools WHERE id=?",
    [id],
    (err, result) => {
      if (result?.length > 0 && result[0].image) {
        fs.unlink(
          path.join("uploads/schoolImages", result[0].image),
          () => {}
        );
      }

      db.query(
        "DELETE FROM schools WHERE id=?",
        [id],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "School and image deleted" });
        }
      );
    }
  );
});

/* ===============================
   DELETE IMAGE ONLY
================================ */

router.delete("/delete-image/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT image FROM schools WHERE id=?",
    [id],
    (err, result) => {
      if (!result?.length || !result[0].image) {
        return res.json({ message: "No image to delete" });
      }

      fs.unlink(
        path.join("uploads/schoolImages", result[0].image),
        () => {}
      );

      db.query(
        "UPDATE schools SET image=NULL WHERE id=?",
        [id],
        () => {
          res.json({ message: "Image deleted successfully" });
        }
      );
    }
  );
});

/* ===============================
   REPLACE IMAGE
================================ */

router.put(
  "/replace-image/:id",
  upload.single("image"),
  (req, res) => {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    db.query(
      "SELECT image FROM schools WHERE id=?",
      [id],
      (err, result) => {
        if (result?.length && result[0].image) {
          fs.unlink(
            path.join("uploads/schoolImages", result[0].image),
            () => {}
          );
        }

        db.query(
          "UPDATE schools SET image=? WHERE id=?",
          [req.file.filename, id],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Image replaced successfully" });
          }
        );
      }
    );
  }
);

/* ===============================
   GET SCHOOLS
================================ */

router.get("/", (req, res) => {
  db.query("SELECT * FROM schools", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export default router;
