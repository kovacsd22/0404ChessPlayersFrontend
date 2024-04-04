import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export function SakkDeletePage() {
  const navigate = useNavigate();
  const param = useParams();
  const sakkId = Number(param.id);

  const [sakk, setSakk] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const response = await axios.get(`http://localhost:3001/chess/${sakkId}`);
        setSakk(response.data);
      } catch (error) {
        console.log(error);
      }
      setPending(false);
    };
    fetchData();
  }, [sakkId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3001/chess/${sakkId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !sakk.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <div className="card p-3">
          <NavLink to={"/"}>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
                alt={sakk.name}
                src={
                  sakk.image_url
                    ? `${sakk.image_url}`
                    : "https://via.placeholder.com/400x800"
                }
              />
            </NavLink>
            <div className="card-body">
            
              <h4>{sakk.name}</h4>
            </div>
            <h5 className="card-title">
             Születési éve : {sakk.birth_date}
            </h5>
            <div className="lead">Megnyert világbajnokságok száma: {sakk.world_ch_won}</div>
            <p>További információkért látogasson el ide: <a href={sakk.profile_url}>{sakk.profile_url}</a></p>
            <form onSubmit={handleDelete}>
              <div>
                <NavLink to={"/"}>
                  <button className="bi bi-backspace btn btn-warning rounded">
                    Mégsem
                  </button>
                </NavLink>
                <button className="bi bi-trash3 btn btn-danger rounded">
                  Törlés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
