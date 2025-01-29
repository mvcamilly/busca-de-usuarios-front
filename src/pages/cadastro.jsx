import React, { useState, useEffect } from 'react';
import style from './cadastro.module.css';
import { MenuLateral } from '../components/menu-lateral';
import { TabelaRegistro } from '../components/tabela-registro';

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
    <div className={style.container}>
      <MenuLateral />
      <div className={style.content}>
        <h1>Cadastrar Usuários</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label>CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
                if (value.length <= 11) {
                  setCpf(value);
                }
              }}
              maxLength={11}
              placeholder="Digite seu CPF"
            />
          </div>
          <div>
            <label>CNS:</label>
            <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type='submit'>{editId ? 'Atualizar' : 'Salvar'}</button>
        </form>
        <TabelaRegistro usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Form;
