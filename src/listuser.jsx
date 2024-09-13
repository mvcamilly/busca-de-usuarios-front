import { Component, Fragment, useEffect, useState, } from 'react';
import style from './listuser.module.css'

//array com os passageiros falsos da API
export function Table() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  const [usuarioId, setUsuarioId] = useState(0);
  const [telefone, setNewTelefone] = useState(0);
  const [cpf, setCpf] = useState('')
  const [ibge, setIbge] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [filterParam, setFIlterParam] = useState(['all']);

  useEffect(() => {

    fetch('http://localhost:3333/pessoas').then(response => response.json()).then(response => setData(response))

  }, [])

  function getUsers() {
    fetch('http://localhost:3333/pessoas').then(response => response.json()).then(response => setData(response))
    console.log('ativado')
  }

  const [name, setName] = useState("")
  async function executa() {
    await fetch("http:/localhost:3333/pessoas", {
      method: "PUT", body: JSON.stringify({ name })
    })
  }




  //funções da tabela
  function updateUsuarios(id) {
    fetch(`http://localhost:3333/pessoas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        name: newName,
        telefone: telefone,
        cpf: cpf,
        ibge: ibge,

      })
    }).then(() => {
      getUsers()
      setUsuarioId()
    })

  }


  function deleteUser(id) {

    fetch(`http://localhost:3333/pessoas/${id}`, {
      method: 'DELETE'
    }).then(() => {
      getUsers()
    })
  }

  //redenderização de tabela
  return (

    <div>
       <div>
            <label>Menu Lateral</label>
            <input type='search' ></input>
            <a href='http://localhost:3000/cadastro'>Lista de cadastro IBGE</a>
            <a href='#'>2 botão de menu</a>
            <a href='#'>3 botão de menu</a>
        </div>
      <strong>
        <label className={style.registro}>Buscar CID-10</label>
        <input placeholder='Digite CID...' className={style.PESquisa}></input>
       


      </strong>

      <table className={style.tabe}>
        <thead className={style.TABELAMOVEL}>
          <tr>
            <th>ID</th>
            <th className={style.tab}>Nome</th>
            <th className={style.tab}>Telefone</th>
            <th className={style.tab}>CPF</th>
            <th className={style.tab}>IBGE</th>
          </tr>



        </thead>
        <tbody>
          {data.map(item => {
            return (

              <tr key={item.id}>
                <td className={style.TD}>{item.id}</td>
                <td className={style.TD}>{item.nome}</td>
                <td className={style.TD}>{item.telefone}</td>
                <td className={style.TD}>{item.cpf}</td>
                <td className={style.TD}>{item.ibge}</td>
              </tr>

            );
          })}
        </tbody>
      </table>
    </div>
  )


}


export default Table;
