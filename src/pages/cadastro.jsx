import React, { useState, useEffect } from 'react';
import style from './cadastro.module.css'
import { MenuLateral } from '../components/menu-lateral';
import { TabelaRegistro } from '../components/tabela-registro';



export function Form() {
  const [cpf, setCpf] = useState('');
  const [newName, setnewName] = useState('');
  const [password, setPassword] = useState('');
  const [editData, setData] = useState([]);
  const [usuarioId, setUsuarioID] = useState();
  // const [item, setItem] = useState()
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')




  useEffect(() => {
    getUsers()
  }, []);

  function getUsers() {
    fetch('http://localhost:3333/usuarios').then(response => response.json()).then(response => setData(response))
  };


  // const hendleEdit = (id, nome) => {
  //   setEditId(id);
  //   setEditName(nome);
  // };


  const [name, setName] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3333/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({ nome: name, cpf, password })
    }).then(() => {
      getUsers()
    })

    setName('');
    setCpf('');
    setPassword('');
  };


  function updateUsuarios(id) {
    fetch(`http://localhost:3333/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': ''
      },
      body: JSON.stringify({
        nome: newName,
        cpf: cpf,

      })
    }).then(() => {
      getUsers()
      setUsuarioID()
    })
  }

  //função delete
  const deleteUser = async (id) => {
    console.log(id)
    fetch(`http://localhost:3333/usuarios/${id}`, {
      method: 'DELETE',
    }).then(() => {
      getUsers()
    })
  }


  return (
    <div className={style.container}>
      <MenuLateral />

      <div className={style.content}>
        <h1>Buscar Usuários</h1>

        <input type="search" placeholder='Pesquisar usuário...' />

        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div >
            <label >CPF:</label>
            <input
              type="number"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div>
            <label >Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>Salvar</button>
        </form>
        <TabelaRegistro editData={editData} />


      </div>

      {
        !!usuarioId && <div className='edição'>

        </div>
      }
    </div>
  );
};

export default Form;