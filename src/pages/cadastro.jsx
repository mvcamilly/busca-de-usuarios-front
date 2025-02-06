import React, { useState, useEffect } from 'react';
import style from './sidebar.module.css';
// import { MenuLateral } from './menu-lateral';
// import { TabelaRegistro } from '../components/pages';

export function Form() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    try {
      const response = await fetch('http://localhost:3333/usuarios');
      const data = await response.json();
      setUsuarios(data || []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:3333/usuarios/${editId}` : 'http://localhost:3333/usuarios';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, senha })
      });
      fetchUsuarios();
      setNome('');
      setCpf('');
      setSenha('');
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3333/usuarios/${id}`, { method: 'DELETE' });
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }

  function handleEdit(usuario) {
    setEditId(usuario.id);
    setNome(usuario.nome);
    setCpf(usuario.cpf);
    setSenha('');
  }

  return (
    <div className={style.diver}>
      <form onSubmit={handleSubmit} className={style.menu} id="menu" >

        <div className={style.ltr}>
          <label className={style.mn}>Menu Lateral</label>
        </div>

        <a href='http://localhost:3000/' className={style.k}>voltar</a>
        <a type='#' className={style.k}>Edição de Cadastro</a>
        <a type='#' className={style.k}>Registros de cadastros</a>

      </form>
      <div className={style.container}>
        <div className={style.content}>
          <h1>Lista de Usuários</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required
                placeholder='DIgite seu nome ou CPF'
              />
            </div>
            <button type='submit'>{editId ? 'Atualizar' : 'Salvar'}</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Form;
