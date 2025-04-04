import React, { useState, useEffect } from 'react';
import style from './sidebar.module.css';


export function Form() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [editId, setEditId] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [data, setData] = useState([]);

  const aplicarFIltro = (novoFiltro) => {
    setFiltro(novoFiltro);
  };

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
    const url = editId ? `http://localhost:3333/cadastro/${editId}` : 'http://localhost:3333/usuarios';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
      });
      fetchUsuarios();
      setNome('');
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      console.log()
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
  }

  return (
    <div className={style.diver}>
      <form onSubmit={handleSubmit} className={style.menu} id="menu">
        <div className={style.ltr}>
          <label className={style.mn}>Menu Lateral</label>
        </div>
        <a href='http://localhost:3000/' className={style.k}>voltar</a>
        <a type='#' className={style.k}>Edição de Cadastro:</a>
        <a type='#' className={style.k}>Registros de cadastros</a>
        <button className={style.desconect}>Desconectar</button>
      </form>

      <div className={style.container}>
        <div className={style.content}>
          <a className={style.aniciF} href='http://localhost:3000/'>voltar para inicial</a>
          <p className={style.muni}>municípios</p>
          <h1 className={style.h1}>Lista de Usuários</h1>
          
          <form className={style.form} onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center">
              {/* Input do shadcn substituindo o input padrão */}
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite o nome ou CPF"
                className={style.inputcpf} />
              <button type="submit" className={style.sep}>
                {editId ? 'Atualizar' : 'Pesquisar'}
              </button>
            </div>
          </form>

          <table className={style.taBlew}>
            <th className={style.tathw}>ID</th>
            <th className={style.tath}>Nome</th>
            <th className={style.tath}>CPF</th>
            <th className={style.tath}>Detalhes</th>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Form;
