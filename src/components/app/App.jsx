import style from './style.module.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [usuarioId, setUsuarioId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para modal

  const navigation = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:3333/cadastro')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar os usuários.');
        }
        return response.json();
      })
      .then(users => setData(users))
      .catch(error => {
        console.error(error);
        toast.error('Erro ao carregar a lista de usuários.');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome) {
      toast.error('Preencha todos os dados para prosseguir.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar');
      }

      await response.json();
      toast.success('Usuário cadastrado com sucesso!');
      getUsers();
      setNome('');
    } catch (error) {
      console.error('Erro', error);
      toast.error('Ocorreu um erro ao salvar os dados.');
    }
  };

  const updateUser = async () => {
    if (!nome.trim()) {
        toast.error('Preencha todos os campos antes de salvar.');
        return;
    }

    try {
        const response = await fetch(`https://localhost:3333/cadastro/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: nome.trim() }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'Erro ao atualizar os dados.');
        }

        setData((prevData) =>
            prevData.map((user) => (user.id === usuarioId ? { ...user, nome } : user))
        );

        toast.success('Dados atualizados com sucesso!');
        setTimeout(() => toast.dismiss(), 3000);

        closeModal(); // Fecha o modal após salvar
    } catch (error) {
        console.log('Erro ao atualizar os dados:', error);
        toast.error(error.message || 'Erro ao salvar as alterações.');
    }
};


  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir o usuário?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/cadastro/${id}`, { method: 'DELETE' });

        if (response.ok) {
          toast.success('Usuário excluído com sucesso');
          getUsers();
          setUsuarioId(null);
        } else {
          toast.error('Ocorreu um erro ao excluir o usuário');
        }
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        toast.error('Erro ao excluir o usuário');
      }
    } else {
      toast.info('Exclusão cancelada');
      setTimeout(() => toast.dismiss(), 3000);
    }
 
  };

  // Função para abrir o modal
  const openModal = (id, nome) => {
    setUsuarioId(id);
    setNome(nome);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioId(null);
    setNome('');
  };

  return (
    <div className={style.mainscreen}>
      <form onSubmit={handleSubmit} className={style.sidemenu}>
        <div className={style.lateral}>
          <label className={style.label}>Menu Lateral</label>
        </div>

        <a href='http://localhost:3000/cadastro' className={style.a}>Lista de Cadastro</a>
        <a href='http://localhost:3000/listuser' className={style.a}>Cadastro de procedimento</a>
        <a type='#' className={style.a}>Registros de cadastros</a>


        <button className={style.desconect}>Desconectar</button>
      </form>

      <div className={style.mainpanel}>
        <p>Cadastro de usuário</p>
        <strong>
          <label className={style.cadastre}>Cadastro de usuário</label>
        </strong>
        <div>
          <input
            placeholder='Nome do usuário...'
            className={style.input}
            value={nome}
            onChange={(e) => setNome(e.target.value) }/>
          <button className={style.buttonsave} onClick={handleSubmit}>Salvar</button>
          <button className={style.buttonsavepx}>Puxar ficha de cadastro</button>
        </div>
        

        <table className={style.maintable}>
          <thead>
            <tr className={style.bordew}>
              <th className={style.id}>ID</th>
              <th className={style.tablu}>Nome</th>
              <th className={style.tablu}>CPF</th>
              <th className={style.tablu}>Data de cadastro</th>
              <th className={style.tablu}>Ações</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td className={style.tdi}>{item.id}</td>
                <td className={style.td}>{item.nome}</td>
                <td className={style.td}>{item.cpf}</td>
                <td className={style.td}>{item.datadecadastro }</td>
                <td className={style.td}>
                  <button
                    className={style.editebutton}
                    onClick={() => openModal(item.id, item.nome)}
                  >
                    Editar
                  </button>

                  <button
                    type='button'
                    className={style.excluirbutton}
                    onClick={() => deleteUser(item.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edição */}
      {isModalOpen &&  (
        <div className={style.modalOverLay} >
          <div className={style.modalConteudo} onClick={closeModal}>
            {/* Botão para fechar o modal */}
            <span onClick={closeModal} className={style.closeX}>&times;</span>

            <h2 className={style.h2}>Edição de Cadastros</h2>

            <form>
              <div className={style.modalGroup}>
                <label className={style.modalLabel}>Nome do usuário:</label>
                <input
                  type="text"
                  className={style.modalInput}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Botões de ação */}
              <div className={style.modalActions}>
                <button type="button" className={style.buttonCancelw} onClick={closeModal}>
                  Cancelar
                </button>
                <button type="button" className={style.buttonSavew} onClick={updateUser}>
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
