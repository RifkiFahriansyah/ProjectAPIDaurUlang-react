import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [namaJenis, setnamaJenis] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [cara_Daur_Ulang, setCara_Daur_Ulang] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://project-api-daur-ulang.vercel.app/api/api/jenisSampah/${id}`)
            .then((response) => {
                setnamaJenis(response.data.result.nama),
                    setDeskripsi(response.data.result.deskripsi),
                    setCara_Daur_Ulang(response.data.result.cara_Daur_Ulang);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError("Data tidak ditemukan");
            });
    }, [id]);

    const handleChange1 = (e) => {
        setnamaJenis(e.target.value)
    }
    const handleChange2 = (e) => {
        setDeskripsi(e.target.value)
    }
    const handleChange3 = (e) => {
        setCara_Daur_Ulang(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-api-daur-ulang.vercel.app/api/api/jenisSampah/${id}`, { namaJenisSampah: namaJenis, deskripsi: deskripsi, cara_Daur_Ulang: cara_Daur_Ulang })
            .then((response) => {
                navigate("/jenisSampah");
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError("Gagal mengupdate data");
            });
    }

    return (
        <div>
            <h2>Edit Jenis Sampah</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Jenis Sampah</label>
                    <input type="text" className="form-control" id="nama" value={namaJenis} onChange={handleChange1} required />

                    <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                        <input type="text" className="form-control" id="deskripsi" value={deskripsi} onChange={handleChange2} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cara_Daur_Ulang" className="form-label">Cara Daur Ulang</label>
                        <input type="text" className="form-control" id="cara_Daur_Ulang" value={cara_Daur_Ulang} onChange={handleChange3} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">save</button>
            </form>
        </div>
    )

}