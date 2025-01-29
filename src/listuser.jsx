import { useEffect, useState } from 'react';
import style from './listuser.module.css';

export function Table() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [ibge, setIbge] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3333/pessoas');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function updateUsuario(id) {
    if (!newName || !telefone || !cpf || !ibge) {
      alert('Preencha todos os campos antes de atualizar.');
      return;
    }

    try {
      await fetch(`http://localhost:3333/pessoas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, telefone, cpf, ibge }),
      });
      fetchUsers();
      setUsuarioId(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }

  async function deleteUser(id) {
    try {
      await fetch(`http://localhost:3333/pessoas/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  return (
    <div className={style.mainscreen}>
      <aside className={style.sidemenu}>
        <nav>
          <a href="#" className={style.a}>Edição de usuário</a>
          <a href="#" className={style.a}>Lista de cadastros</a>
          <a href="#" className={style.a}>Registros de cadastros</a>
        </nav>
      </aside>

      <main className={style.class}>
        <h2 className={style.cadastre}>Pesquisa de Usuário</h2>
        <div>
          <input className={style.input} placeholder="Pesquisar..." />
          <button className={style.pesquisar}>Pesquisar</button>
        </div>
        
        <table className={style.meintable}>
          <thead>
            <tr>
              <th className={style.thlistuser}>ID</th>
              <th className={style.thlistuser}>Nome</th>
              <th className={style.thlistuser}>Telefone</th>
              <th className={style.thlistuser}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.telefone}</td>
                <td>
                  <button onClick={() => updateUsuario(user.id)}>Editar</button>
                  <button onClick={() => deleteUser(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Table;
