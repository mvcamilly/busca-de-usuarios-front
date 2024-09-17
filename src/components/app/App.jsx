import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useState } from 'react';

// exportação de função
export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const [data, setData] = useState([]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);


    try {
      const response = await fetch('http://localhost:3333/menssage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Dados Salvos com sucesso:', result);
      // navigation('/head')

    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const saveData = async (e) => {

  }


  //rendederização de tabela
  return (
    <div className={style.mainscreen}>

      <form onSubmit={handleSubmit} className={style.sidemenu}>

        <div className={style.lateral}>
          <label className={style.label}>menu lateral</label>
          <input type="search" className={style.sideentrance} value={formData.text} onChange={handleChange} />
        </div>

        <button type="submit" className={style.button}>botão 1</button>
        <button type="submit" className={style.button}>botão 2</button>
        <button type="submit" className={style.button}>botão 3</button>

      </form>

      <div className={style.mainpanel}>
        <label className={style.cadastre}>Cadastro de usuário</label>
        <input type='search' className={style.mainentrance}></input>
        <div>
          <label className={style.name}>Nome:</label>
          <input className={style.input}></input>
        </div>
        <div>
          <label className={style.sobrenome}>Sobrenome:</label>
          <input className={style.input}></input>
        </div>
        <button className={style.buttonsave}>Salvar</button>


        <table className={style.maintable}>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>sobrenome</th>
          </tr>
        </table>
        <thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td></td>
                  <td></td>
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