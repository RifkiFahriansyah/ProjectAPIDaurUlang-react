import React, { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

export default function List() {
    const [ProsesDaurUlang, setProsesDaurUlang] = useState([])
    useEffect(() => {
        axios.get("https://project-api-daur-ulang.vercel.app/api/api/prosesDaurUlang")
            .then((response) => {
                console.log(response.data.result)
                setProsesDaurUlang(response.data.result)
            })
            .catch(error => {
                console.log('Error : ', error)
            })
    }, [])


    return (
        <div>

           
            <h2>Proses Daur Ulang</h2>
            <NavLink to="/prosesDaurUlang/create" className="btn btn-primary my-4">+ Tambah</NavLink>
            <ul className="list-group">
                {
                    <table className="table table-success table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">Nama Proses</th>
                                <th scope="col">Jenis Sampah</th>
                                <th scope="col">Deskripsi</th>
                                <th scope="col">hari</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ProsesDaurUlang.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.nama_proses}</td>
                                            <td>{data.jenis_sampah.namaJenisSampah}</td>
                                            <td>{data.deskripsi}</td>
                                            <td>{data.hari}</td>
                                            <td>
                                                <NavLink to={`/prosesDaurUlang/edit/${data.id}`} className="btn btn-warning">
                                                Edit </NavLink>
                                            </td>
                                        </tr>
                                ))}
                        </tbody>
                    </table>
                }
            </ul>
        </div>
    )
}
