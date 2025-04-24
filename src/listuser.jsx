import { useEffect, useState } from 'react';
import style from './listuser.module.css';

export function Table() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  // const [ibge, setIbge] = useState('');

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
    if (!newName || !cpf) {
      alert('Preencha todos os campos antes de atualizar.');
      return;
    }

    try {
      await fetch(`http://localhost:3333/pessoas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, telefone, cpf, }),
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
      <form className={style.sidemenu}>
        <div>
          <label>Menu lateral</label>
        </div>
        <a href="http://localhost:3000/" className={style.listena}>Lista de Usuários</a>
        <a href="http://localhost:3000/cadastro" className={style.listena}>Lista de cadastros</a>
        <a href="http://localhost:3000/head" className={style.listena}>Lista de Profissionais</a>


        <button className={style.listendesconect}>Desconectar</button>
      </form>

      <div className={style.class}>
        <p>cadastro de procedimento</p>
        <strong>
          <label className={style.cadastre}>Cadastro de Procedimento</label>
        </strong>
        <div className={style.eoxe}>
          <input className={style.inputsave} placeholder="Pesquisar..." />
          <button className={style.savebutton}>Pesquisar</button>

          <button className={style.exportregis}>Exportar registro</button>
        </div>
        <div className={style.equipes}>
          <div className={style.divlabel}>
            <label className={style.labelquipe}>Equipe:</label>
            <label className={style.labelprof}>Profissional:</label>
            <label className={style.labelbloc}>Bloco:</label>
            <label className={style.labelfilt}>Tipo de filtro:</label>
          </div>
          <div className={style.divinput}>
            <input className={style.inputepic}></input>
            <input className={style.inputepic}></input>
            <input className={style.inputepic}></input>
            <input className={style.inputepic}></input>
          </div>
          <button className={style.saveepic}>Salvar</button>
        </div>

        <table className={style.meintable}>
          <thead>
            <tr className={style.thr}>
              <th className={style.thlistuserno}>Nome</th>
              <th className={style.thlistuserequi}>Equipes</th>
              <th className={style.thlistuserprof}>Profissional</th>
              <th className={style.thlistusercpf}>CPF</th>
              <th className={style.thlistuserdt}>Data de Nascimento</th>
              <th className={style.thlistusersitu}>Situação</th>
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
      </div>
    </div>
  );
}

export default Table;
