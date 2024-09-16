import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useState } from 'react';


function Form() {
  const [formData, setFormData] = useState({
    nome: '',
  });

  const navigation = useNavigate()


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
        <label >cadastro de usuário</label>
        <input type='search' className={style.mainentrance}></input>
        <modal>
          <label className={style.name}>nome</label>
          <input></input>
          <label className={style.input}>sobrenome</label>
          <input className={style.input}></input>
        </modal>
      </div>
      <div>
      <table>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>sobrenome</th>
          </tr>
        </table>
      </div>
    </div>

  );
}

export default Form; 