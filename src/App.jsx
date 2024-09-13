import { useNavigate } from 'react-router-dom';
import './style.css'

import React, { useState } from 'react';


function Form() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
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
      navigation('/head')

    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const saveData = async (e) => {

  }


  return (
    <div className="mainscreen">

      <form onSubmit={handleSubmit} className='sidemenu'>

        <div className="lateral">
          <label className="label">menu lateral</label>
          <input type="search" className="sideentrance" value={formData.text} onChange={handleChange}/>
        </div>

        <button type="submit" className="button">botão 1</button>
        <button type="submit" className="button">botão 2</button>
        <button type="submit" className="button">botão 3</button>

      </form>
    </div>

  );
}

export default Form; 