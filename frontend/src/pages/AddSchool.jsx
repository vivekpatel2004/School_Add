import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    formData.append("image", data.image[0]); // ✅ correct

    try {
      await axios.post(
        "http://localhost:5000/api/schools/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("School added successfully");
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to save school");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add School</h2>

      <form className="form-card" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <input
            placeholder="School Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="error">School name is required</span>}
        </div>

        <div className="form-group">
          <input
            placeholder="Address"
            {...register("address", { required: true })}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="City"
            {...register("city", { required: true })}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="State"
            {...register("state", { required: true })}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Contact"
            {...register("contact", { required: true })}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            {...register("email_id", {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.email_id && (
            <span className="error">Enter a valid email</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="file"
            {...register("image", { required: true })}
          />
          {errors.image && <span className="error">Image is required</span>}
        </div>

        <button className="btn">Save School</button>
      </form>
    </div>
  );
}
