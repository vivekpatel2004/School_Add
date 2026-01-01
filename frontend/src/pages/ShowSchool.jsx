import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchool() {
  const [schools, setSchools] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  /* =======================
     FETCH SCHOOLS
  ======================= */
  const fetchSchools = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/schools");
      setSchools(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  /* =======================
     EDIT SCHOOL
  ======================= */
  const handleEdit = (school) => {
    setEditId(school.id);
    setForm({
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      contact: school.contact,
      email_id: school.email_id,
    });
  };

  /* =======================
     UPDATE TEXT DATA
  ======================= */
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/schools/update/${editId}`,
        form
      );
      setEditId(null);          // 🔥 EXIT EDIT MODE
      fetchSchools();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  /* =======================
     DELETE SCHOOL
  ======================= */
  const handleDeleteSchool = async (id) => {
    if (!window.confirm("Delete this school?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/schools/delete/${id}`
      );
      fetchSchools();
    } catch (err) {
      console.error("Delete school error:", err);
    }
  };

  /* =======================
     DELETE IMAGE ONLY
  ======================= */
  const handleDeleteImage = async (id) => {
    if (!window.confirm("Delete image only?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/schools/delete-image/${id}`
      );
      fetchSchools();
    } catch (err) {
      console.error("Delete image error:", err);
    }
  };

  /* =======================
     REPLACE IMAGE
  ======================= */
  const handleReplaceImage = async (id, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(
        `http://localhost:5000/api/schools/replace-image/${id}`,
        formData
      );
      fetchSchools();
    } catch (err) {
      console.error("Replace image error:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="title">View Schools</h2>

      {schools.map((s) => (
        <div className="school-card" key={s.id}>

          {/* ================= IMAGE SECTION ================= */}
          <div className="school-image">
            {s.image ? (
              <img
                src={`http://localhost:5000/uploads/schoolImages/${s.image}`}
                alt={s.name}
              />
            ) : (
              <p style={{ color: "#888", fontSize: "0.9rem" }}>
                No image available
              </p>
            )}

            {/* IMAGE ACTIONS — ONLY IN EDIT MODE */}
            {editId === s.id && (
              <>
                <button
                  className="btn small danger"
                  style={{ marginTop: "6px" }}
                  onClick={() => handleDeleteImage(s.id)}
                >
                  Delete Image
                </button>

                <input
                  type="file"
                  style={{ marginTop: "6px" }}
                  onChange={(e) =>
                    handleReplaceImage(s.id, e.target.files[0])
                  }
                />
              </>
            )}
          </div>

          {/* ================= DETAILS SECTION ================= */}
          <div className="school-details">
            {editId === s.id ? (
              <>
                <input
                  value={form.name || ""}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <input
                  value={form.address || ""}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <input
                  value={form.city || ""}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                />
                <input
                  value={form.state || ""}
                  onChange={(e) =>
                    setForm({ ...form, state: e.target.value })
                  }
                />
                <input
                  value={form.contact || ""}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                />
                <input
                  value={form.email_id || ""}
                  onChange={(e) =>
                    setForm({ ...form, email_id: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <h2>{s.name}</h2>
                <h3>Address: {s.address}</h3>
                <h3>City: {s.city}</h3>
                <h3>State: {s.state}</h3>
                <h3>Contact: {s.contact}</h3>
                <h3>Email: {s.email_id}</h3>
              </>
            )}
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="card-actions">
            {editId === s.id ? (
              <button className="btn small" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <>
                <button
                  className="btn small"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>

                <button
                  className="btn small danger"
                  onClick={() => handleDeleteSchool(s.id)}
                >
                  Delete School
                </button>
              </>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
