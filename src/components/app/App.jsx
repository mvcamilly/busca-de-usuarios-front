// import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useState } from 'react';

// exportação de função
export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState(['']);
  const [sobrenome, setSobrenome] = useState(['']);
  const [telefone, setTelefone] = useState([0]);


  document.getElementById('sidemenu').addEventListener('submit', function(event){
    event.preventDefault(); //evita o envio da formulário padrao 


    //coleta de dados do formulário
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone = document.getElementById('telefone').value;

    //enviar dados para a API
    fecth('', {
      method: 'POST',
      headers: {
        'Content-type': 'application.json',
      },
      body: JSON.stringify({id, nome, sobrenome, telefone}),
    })

    .then(reponse => {
      if (!response) {
        throw new Error('error ao salvar');
      }
      return response.json();
    })

    .then(data => {
      document.getElementById('resultado').innerText ='usuario salvo';
      console.log(data);
    })
    .catch(error => {
      document.getElementById('resultado').innerText = error.message;
    });
  });

//submit é interceptado para evitar o comportamento padrão de recarregar a pagina.
//fetch é usada para enviar uma solicitação POST para a API com os dados no formato JSON.






  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };


  // // function getUsers() {
  // //   fecth('').then(response => response.json()).then(response => setData(response))
  // // }  


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Dados do formulário:', formData);



  //   try {
  //     const response = await fetch('http://localhost:3333/menssage', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();
  //     console.log('Dados Salvos com sucesso:', result);
  //     // navigation('/head')

  //   } catch (error) {
  //     console.error('Erro ao salvar dados:', error);
  //   }
  // };



  //rendederização de tabela
  return (
    <div className={style.mainscreen}>

      <form onSubmit={handleSubmit} className={style.sidemenu} id="sidemenu">

        <div className={style.lateral}>
          <label className={style.label}>Menu Lateral</label>
          <input type="search" className={style.sideentrance} value={formData.text} onChange={handleChange} />
        </div>

        <a type='#' className={style.a}>botão 1</a>
        <a type='#' className={style.a}>botão 2</a>
        <a type='#' className={style.a}>botão 3</a>

      </form>

      <div className={style.mainpanel}>
        <label className={style.cadastre}>Cadastro de usuário</label>
        <input type='search' className={style.mainentrance}></input>
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
        <button className={style.buttonsave}>Salvar</button>


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