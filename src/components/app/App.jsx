// import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useEffect, useState } from 'react';

// exportação de função
export function Form() {
  const [formData, setFormData] = useState({ nome: '', });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState([0]);


  //botão de salvar
  function getUsers() {
    fetch('http://localhost:3333/cadastro').then(response => response.json()).then(response => setData(response))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3333/cadastro`, {
      method: 'POST',
      headers: {
        'Content-TYPE': 'Application/json'
      },
      body: JSON.stringify({ nome, sobrenome, telefone })
    }).then(() => {
      getUsers()
    })


    setNome('');
    setSobrenome('');
    setTelefone('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  //função delete 
  const deleteUSer = async (id) => {
    console.log(id)
    fetch(`http://localhosgt:3333/cadastro/${id}`, {
      method: 'DELETE', 
    }).then(() => {
      getUsers()
    })
  }

  //rendederização de tabela
  return (
    <div className={style.mainscreen}>

      <form onSubmit={handleSubmit} className={style.sidemenu} id="sidemenu">

        <div className={style.lateral}>
          <label className={style.label}>Menu Lateral</label>
          <input type="search" className={style.sideentrance} value={formData.text} onChange={handleChange} />
        </div>

        <a type='#' className={style.a}>Geral</a>
        <a type='#' className={style.a}>Cadastros</a>
        <a type='#' className={style.a}>Registros</a>

      </form>

      <div className={style.mainpanel}>
        <label className={style.cadastre}>Cadastro de usuário</label>
        {/* <input type='search' className={style.mainentrance}></input> */}
        <div>
          <label className={style.name}>Nome:</label>
          <input className={style.input} onChange={(e) => setNome(e.target.value)}></input>
        </div>
        <div>
          <label className={style.name}>Sobrenome:</label>
          <input className={style.input} onChange={(e) => setSobrenome(e.target.value)}></input>
        </div>
        <div>
          <label className={style.name}>Telefone:</label>
          <input type='number' className={style.input} onChange={(e) => setTelefone(e.target.value)}></input>
        </div>
        <button className={style.buttonsave} onClick={handleSubmit}>Salvar</button>




        <table className={style.maintable}>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Telefone</th>
          </tr>
        </table>
        <thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td className={style.td}>{item.id}</td>
                  <td className={style.td}>{item.nome}</td>
                  <td className={style.td}>{item.sobrenome}</td>
                  <td className={style.td}>{item.telefone}</td>
                </tr>
              )
            })}
          </tbody>
        </thead>
      </div>

    </div>

  );
}

export default Form;
