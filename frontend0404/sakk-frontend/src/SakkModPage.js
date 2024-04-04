import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function SakkModPage() {
  const params = useParams();
  const navigate = useNavigate();
  const sakkId = params.id;

  const [, setSakk] = useState({});
  const [modName, setModName] = useState("");
  const [modBirthDate, setModBirthDate] = useState("");
  const [modWorldChWon, setModWorldChWon] = useState(0);
  const [modProfileUrl, setModProfileUrl] = useState("");
  const [modImageUrl, setModImageUrl] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/chess/${sakkId}`)
      .then((response) => {
        const data = response.data;
        setSakk(data);
        setModName(data.name);
        setModBirthDate(data.birth_date);
        setModWorldChWon(data.world_ch_won);
        setModProfileUrl(data.profile_url);
        setModImageUrl(data.image_url);
      })
      .catch(console.error);
  }, [sakkId]);

  const handleNameChange = (e) => {
    setModName(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setModBirthDate(e.target.value);
  };

  const handleWorldChWonChange = (e) => {
    setModWorldChWon(e.target.value);
  };

  const handleProfileUrlChange = (e) => {
    setModProfileUrl(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setModImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/chess/${sakkId}`, {
      id: sakkId,
      name: modName,
      birth_date: modBirthDate,
      world_ch_won: modWorldChWon,
      profile_url: modProfileUrl,
      image_url: modImageUrl,
    })
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className="p-5 text-center content bg-lavender">
      <h2>Sakkozó módosítása</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név:</label>
          <div>
            <input
              type="text"
              name="name"
              className="form-control"
              defaultValue={modName}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Születési dátum:</label>
          <div>
            <input
              type="date"
              name="birth_date"
              className="form-control"
              defaultValue={modBirthDate}
              onChange={handleBirthDateChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Megnyert világbajnokságok száma:</label>
          <div>
            <input
              type="number"
              name="world_ch_won"
              className="form-control"
              defaultValue={modWorldChWon}
              onChange={handleWorldChWonChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Profil URL:</label>
          <div>
            <input
              type="text"
              name="profile_url"
              className="form-control"
              defaultValue={modProfileUrl}
              onChange={handleProfileUrlChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div>
            <input
              type="text"
              name="image_url"
              className="form-control"
              defaultValue={modImageUrl}
              onChange={handleImageUrlChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
