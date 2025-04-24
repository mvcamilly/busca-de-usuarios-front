import style from './head.module.css'


import { useNavigate } from 'react-router-dom'; //navegação automática de páginas
import React, { useState } from 'react';
import { toast } from 'sonner';


export function Header() {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState('');

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
    if (!formData.nome || !formData.sobrenome || !formData.telefone) {
      console.log(formData)
      setAlert('Por Favor, preencha os dados necessários.')
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

      navigation('/head')

    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }


  return (
    <div className={style.divhead}>
      <form onSubmit={handleSubmit} className={style.sidelatel}>
        <div className={style.lateralhead}>
          <label>Menu lateral</label>
        </div>
        <a href="http://localhost:3000/" className={style.ahead}>Lista de Usuário</a>
        <a href='http://localhost:3000/listuser' className={style.ahead}>Cadastro de procedimento</a>
        <a href='http://localhost:3000/cadastro' className={style.ahead}>Lista de Cadastro</a>
        <button className={style.desconecthead}>Desconectar</button>
      </form>

      <div className={style.mainpanelhead}>
        <p>Lista de profissionais</p>
        <h1>Lista de profissionais</h1>
        <form>
          <div> 
            <input placeholder='nome do cidadão' className={style.inputhead}/>
            <button className={style.buttonhead}>pesquisar</button>
            <table className={style.bordhead}>
              <thead>
              <th className={style.thead}>id</th>
              <th className={style.thead}>nome</th>
              <th className={style.thead}>cargo</th>
              <th className={style.thead}>municipio</th>
              <th className={style.thead}>procedimento</th>
              </thead>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Header; 