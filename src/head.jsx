import { useNavigate } from 'react-router-dom';
import style from './head.module.css'

import React, { useState } from 'react';
import { toast } from 'sonner';

export function Header() {


  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    ibge: '',
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
    if (!formData.nome || !formData.telefone || !formData.cpf || !formData.ibge) {
      console.log(formData)
      // setAlert('Por Favor, preencha os dados necessários.')
      toast.error('Preencha todos os dados para proseguir')
      return
    }

    try {
      const response = await fetch('http://localhost:3333/head', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Dados Salvos com sucesso:', result);

      navigation('/listuser')

    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }


  return (
    <div className={style.divv}>
      <header className={style.cad}>
        <strong>
          <label className={style.cadastro}>CADASTRO
            <a href="http://localhost:3000/listuser">/LISTAR</a></label>


        </strong>

      </header>
      <header className={style.table}>
        <strong>
          <label className={style.CADASTAB}>Cadastre o usuário</label>
        </strong>
        <label className={style.name}>Nome</label>
        <input type="text" name="nome" className={style.tab}
          onChange={handleChange} />

        <label className={style.name}>Telefone</label>
        <input type="number" name="telefone" className={style.tab}
          onChange={handleChange} />

        <label className={style.name}>CPF</label>
        <input type="number" name="cpf" className={style.tab}
          onChange={handleChange} />

        <label className={style.name}>IBGE</label>
        <input type="number" name="ibge" className={style.tab}
          onChange={handleChange} />

        <button type="button" name="name" className={style.OK} onClick={handleSubmit}>Ok</button>

      </header>
      <div>
        <label></label>
      </div>
    </div>
  );
}

export default Header; 