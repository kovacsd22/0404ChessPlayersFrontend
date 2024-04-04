import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export function SakkListPage()
{
    const [sakks, setSakks] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get('http://localhost:3001/chess')
          .then((res) => {
            console.log("Fetched sakks:", res);
            setSakks(res.data);
          })
          .catch((error) => console.error("Fetch error:", error))
          .finally(() => {
            setFetchPending(false);
          });
      }, []);

      return (
        <div className="p-5 m-auto text-center content bg-ivory">
          {isFetchPending ? (
            <div className="spinner-border"></div>
          ) : (
            <div>
              <h2>Sakkozók adatai</h2>
              {sakks.map((sakk) => (
                <div
                  key={sakk.id}
                  className="card col-sm-3 d-inline-block m-1 p-2"
                >
                    <NavLink key={sakk.id} to={"/chess/" + sakk.id}>
                    <div className="card-body">
                      <img
                        className="img-fluid"
                        style={{ maxHeight: 200 }}
                        alt={sakk.name}
                        src={
                          sakk.image_url
                            ? `${sakk.image_url}`
                            : "https://via.placeholder.com/400x800"
                        }
                      />
                    </div>
                  </NavLink>
                  <h6 className="text-muted">{sakk.name}</h6>
                  <div>
                    Születési éve: {sakk.birth_date}
                  </div>
                  <div className="lead">Megnyert világbajnokságok száma: <br></br> {sakk.world_ch_won}</div>
                  <p>További információkért látogasson el ide: <a href={sakk.profile_url}>{sakk.profile_url}</a></p>
                  <br />
                  <NavLink key={sakk.id + 1} to={"/mod-sakk/" + sakk.id}>
                    <i className="bi bi-pencil-square mx-1">Módosítás</i>
                  </NavLink>
                  <NavLink
                    key={sakk.id + 2}
                    to={"/del-sakk/" + sakk.id}
                    className={"text-danger"}
                  >
                    <i className="bi bi-trash3">Törlés</i>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}
