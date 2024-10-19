import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [namaProses, setNamaProses] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [hari, setHari] = useState("");
    const [jenisSampah, setJenisSampah] = useState("");
    const [jenisSampahList, setJenisSampahList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://project-api-daur-ulang.vercel.app/api/api/prosesDaurUlang/${id}`)
            .then((response) => {
                setNamaProses(response.data.result.namaProses);
                setDeskripsi(response.data.result.deskripsi);
                setHari(response.data.result.hari);
                setJenisSampah(response.data.result.jenisSampah);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError("Data tidak ditemukan");
            });
        
        axios.get("https://project-api-daur-ulang.vercel.app/api/api/jenisSampah")
            .then((response) => {
                setJenisSampahList(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [id]);

    const handleChange1 = (e) => {
        setNamaProses(e.target.value);
    };
    const handleChange2 = (e) => {
        setDeskripsi(e.target.value);
    };
    const handleChange3 = (e) => {
        setHari(e.target.value);
    };
    const handleChange4 = (e) => {
        setJenisSampah(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-api-daur-ulang.vercel.app/api/api/prosesDaurUlang/${id}`, { nama_proses : namaProses , deskripsi: deskripsi, hari: hari, jenis_sampah_id: jenisSampah })
            .then((response) => {
                navigate("/prosesDaurUlang");
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError("Gagal mengupdate data");
            });
    };

    return (
        <div>
            <h2>Edit Proses Daur Ulang</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProses" className="form-label">Proses Daur Ulang</label>
                    <input type="text" className="form-control" id="namaProses" value={namaProses} onChange={handleChange1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                    <input type="text" className="form-control" id="Deskripsi" value={deskripsi} onChange={handleChange2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="hari" className="form-label">Hari</label>
                    <input type="text" className="form-control" id="hari" value={hari} onChange={handleChange3} required />
                </div>
                <div className="mb-3">
                    <option value="">Pilih Jenis Sampah</option>
                    <select className="form-select" id="jenisSampah" value={jenisSampah}
                        onChange={(e) => setJenisSampah(e.target.value)}>
                    <option disabled value="">Pilih Jenis Sampah</option>
                        {jenisSampahList.map((data) => (
                            <option key={data.id} value={data.id}>{data.namaJenisSampah}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">save</button>{" "}
            </form>
        </div>
    )

}