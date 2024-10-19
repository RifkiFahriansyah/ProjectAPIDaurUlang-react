import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateProdi() {
    const [namaProses, setNamaProses] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [hari, setHari] = useState("");
    const [jenisSampahId, setJenisSampahId] = useState("");
    const [jenisSampahList, setJenisSampahList] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchJenisSampah = async () => {
            try{
                const response = await axios.get(
                    "https://project-api-daur-ulang.vercel.app/api/api/jenisSampah"
                );
                setJenisSampahList(response.data.result);
            }catch(error){
                setError("Failed to")
            }
        };
        fetchJenisSampah();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaProses.trim() === "" || jenisSampahId.trim() === "") {
            setError("Proses daur ulang dan jenis sampah harus diisi");
            return;
        }

        try {
            const response = await axios.post(
                "https://project-api-daur-ulang.vercel.app/api/api/prosesDaurUlang",
                {
                    nama_proses: namaProses,
                    deskripsi: deskripsi,
                    hari: hari,
                    jenis_sampah_id: jenisSampahId,
                }
            );
            if (response.status === 201) {
                setSuccess("Prodi created successfully");
                setNamaProses("");
                setDeskripsi("");
                setHari("");
                setJenisSampahId("");
            } else {
                setError("Failed to create Prodi");
            }
        } catch (error) {
            setError("An error occurred while creating Fakultas");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tambah Proses Daur Ulang</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProses" className="form-label">Proses Daur Ulang</label>

                    <input type="text" className="form-control" id="namaProses"
                        value={namaProses} onChange={(e) => setNamaProses(e.target.value)}
                        placeholder="Masukkan Nama Prodi"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deskripsi" className="form-label">Deskripsi</label>

                    <input type="text" className="form-control" id="deskripsi"
                        value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukkan Deskripsi"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hari" className="form-label">Hari</label>

                    <input type="text" className="form-control" id="hari"
                        value={hari} onChange={(e) => setHari(e.target.value)}
                        placeholder="Masukkan Hari"
                    />
                </div>
                <div className="mb-3">
                    <option value="">Pilih Jenis Sampah</option>
                    <select className="form-select" id="jenisSampahId" value={jenisSampahId}
                        onChange={(e) => setJenisSampahId(e.target.value)}>
                    <option disabled value="">Pilih Jenis Sampah</option>
                        {jenisSampahList.map((data) => (
                            <option key={data.id} value={data.id}>{data.namaJenisSampah}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Tambah</button>
            </form>
        </div>


    );
}