import React, { useState } from "react";
import axios from "axios";

export default function CreateFakultas() {
    const [namaJenis, setnamaJenis] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [cara_Daur_Ulang, setCara_Daur_Ulang] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaJenis.trim() === "") {
            setError("Nama Fakultas is required");
            return;
        }

        try {
            const response = await axios.post(
                "https://project-api-daur-ulang.vercel.app/api/api/jenisSampah",
                { namaJenisSampah: namaJenis, deskripsi: deskripsi, cara_Daur_Ulang: cara_Daur_Ulang }
            );
            if (response.status === 201) {
                setSuccess("Jenis Sampah Berhasil Ditambahkan");
                setnamaJenis("");
                setDeskripsi("");
                setCara_Daur_Ulang("");
            } else {
                setError("Gagal menambahkan Jenis Sampah");
            }
        } catch (error) {
            setError("Gagal saat menambahkan Jenis Sampah");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tambah Jenis Sampah</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaJenis" className="form-label">Jenis Sampah</label>

                    <input type="text" className="form-control" id="namaJenis"
                        value={namaJenis} onChange={(e) => setnamaJenis(e.target.value)}
                        placeholder="Masukkan Jenis Sampah"
                    />

                    <label htmlFor="deskripsi" className="form-label">Deskripsi</label>

                    <input type="text" className="form-control" id="deskripsi   "
                        value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukkan Deskripsi"
                    />
                    <label htmlFor="cara_Daur_Ulang" className="form-label">Cara Daur Ulang</label>

                    <input type="text" className="form-control" id="cara_Daur_Ulang"
                        value={cara_Daur_Ulang} onChange={(e) => setCara_Daur_Ulang(e.target.value)}
                        placeholder="Masukkan cara daur ulang"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Tambah</button>
            </form>
        </div>


    );
}