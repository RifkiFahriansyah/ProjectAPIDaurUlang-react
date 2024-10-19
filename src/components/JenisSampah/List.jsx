import React, { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

export default function List() {
    const [jenisSampah, setJenisSampah] = useState([])
    useEffect(() => {
        axios.get("https://project-api-daur-ulang.vercel.app/api/api/jenisSampah")
            .then((response) => {
                console.log(response.data.result)
                setJenisSampah(response.data.result)
            })
            .catch(error => {
                console.log('Error : ', error)
            })
    }, [])

    return (
        <>
            <h2>Jenis Sampah</h2>

            {/* Button tambah Jenis Sampah */}
            <NavLink to="/jenisSampah/create" className="btn btn-primary my-4">Tambah</NavLink>

            <ul className="list-group">
               <table className="table table-success table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">Nama</th>
                                <th scope="col">Deskripsi</th>
                                <th scope="col">Cara Daur Ulang</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jenisSampah.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.namaJenisSampah}</td>
                                            <td>{data.deskripsi}</td>
                                            <td>{data.cara_Daur_Ulang}</td>
                                            <td>
                                                <NavLink to={`/jenisSampah/edit/${data.id}`} className="btn btn-warning">
                                                Edit </NavLink>
                                            </td>
                                        </tr>
                                ))}
                        </tbody>
                    </table>
            </ul>
        </>
    )
}
