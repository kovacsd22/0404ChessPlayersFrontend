import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

export function SakkSinglePage() {
    
    const param = useParams();
    const sakkId = param.id;

    const [sakk, setSakk] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
    
        axios.get(`http://localhost:3001/chess/${sakkId}`)
          .then((response) => setSakk(response.data))
          .catch(console.log)
          .finally(() => {
            setPending(false);
          });
      }, [sakkId]);
    
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
                
              </div>
            </div>
          )}
        </div>
      );
}