// import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

//exportação de função
export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
  });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState([0]);
  const [usuarioId, setUsuarioId] = useState();


  //botão de salvar
  function getUsers() {
    fetch('http://localhost:3333/cadastro').then(response => response.json()).then(response => setData(response))
  }





  const navigation = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  //função para input salvar e não salvar
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nome, sobrenome, telefone)
    if (!nome || !sobrenome || !telefone) {
      toast.error('Preencha todos os dados para prossegir.')
      return
    }

    try {
      const response = await fetch('http://localhost:3333/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          telefone,
          sobrenome,
        }),
      });

      if (!response.ok) {
        throw new Error('error ao salvar')
      }

      const result = await response.json();
      console.log('dados salvos com sucesso', result)

      await navigation();
      await getUsers();

      setNome('');
      setSobrenome('');
      setTelefone('');
    } catch (error) {
      console.error('Error', error)
      toast.error('Ocorreu um erro ao salvar os dados')
    }

  };

  //função delete 
  const deleteUSer = async (id) => {
    console.log(id)
    fetch(`http://localhost:3333/cadastro/${id}`, {
      method: 'DELETE',
    }).then(() => {
      getUsers()
    })
    e.preventDefault();
    
  }

  //rendederização de tabela
  return (
    <div className={style.mainscreen}>

      <form onSubmit={handleSubmit} className={style.sidemenu} id="sidemenu" >

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
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td className={style.td}>{item.id}</td>
                  <td className={style.td}>{item.nome}</td>
                  <td className={style.td}>{item.sobrenome}</td>
                  <td className={style.td}>{item.telefone}</td>
                  <td className={style.td}>{item.acoes}
                    <button onClick={() => setUsuarioId(item.id)} className={style.editebutton}>Editar</button>
                    <button type='button' onClick={() => deleteUSer(item.id)} className={style.excluirbutton}>Excluir</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


    </div>

  );
}

export default Form;
