import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SakkCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 text-center content bg-whitesmoke">
      <h2>Új sakkozó</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("http://localhost:3001/chess", {
            name: e.target.elements.name.value,
            birth_date: e.target.elements.birth_date.value,
            world_ch_won: parseInt(e.target.elements.world_ch_won.value),
            profile_url: e.target.elements.profile_url.value,
            image_url: e.target.elements.image_url.value,
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Név:</label>
          <div>
            <input type="text" name="name" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Születési dátum:</label>
          <div>
            <input type="date" name="birth_date" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Megnyert világbajnokságok száma:</label>
          <div>
            <input type="number" name="world_ch_won" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Profil URL:</label>
          <div>
            <input type="text" name="profile_url" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Kép URL:</label>
          <div>
            <input type="text" name="image_url" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
