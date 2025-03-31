import style from './style.module.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

//exportação de função
export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [usuarioId, setUsuarioId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); //controle do modal 

  const navigation = useNavigate()

  // Carrega a lista de usuários automaticamente ao montar o componente (mostra a tabela em tela)
  useEffect(() => {
    getUsers();
  }, []);

  //função de buscar usuario
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


  //função para input salvar e não salvar
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nome,)
    if (!nome) {
      toast.error('Preencha todos os dados para prossegir.')
      return
    }

    try {
      const response = await fetch('http://localhost:3333/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
        }),
      });
      if (!response.ok) {
        throw new Error('error ao salvar')
      }

      const result = await response.json();
      console.log('dados salvos com sucesso', result)

      await navigation();
      await getUsers();

      setNome('');
    } catch (error) {
      console.error('Error', error)
      toast.error('Ocorreu um erro ao salvar os dados')
    }

  };



  //função de salvar modal e alterar na tabela 

  const updateUser = async () => {
    // Validação dos campos
    if (!nome.trim()) {
      toast.error('Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      // Requisição para atualizar o usuário
      const response = await fetch(`http://localhost:3333/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
        }),
      });

      if (!response.ok) {
        // Extrai mensagem de erro da API, se disponível
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Erro ao atualizar os dados.');
      }

      // Processa a resposta
      const updatedUser = await response.json();
      console.log('Dados salvos com sucesso:', updatedUser);

      // Atualiza o estado local da tabela com o novo usuário
      setData((prevData) =>
        prevData.map((user) =>
          user.id === usuarioId ? { ...user, nome, } : user
        )
      );

      // Exibe feedback ao usuário
      toast.success('Dados atualizados com sucesso!');
      setTimeout(() => toast.dismiss(), 3000);
      closeModal(); // Fecha o modal
    } catch (error) {
      console.log('Erro ao atualizar os dados:', error);
      toast.error(error.message || 'Erro ao salvar as alterações.');
    }
  };




  //função excluir usuario 
  const deleteUser = async (id) => {
    // Exibe a caixa de confirmação
    const confirmDelete = window.confirm('Tem certeza que deseja excluir o usuário?');
    if (confirmDelete) {
      // Se o usuário confirmar a exclusão, realiza a requisição para excluir o usuário
      try {
        const response = await fetch(`http://localhost:3333/cadastro/${id}`,
          { method: 'DELETE' });

        // Verifica se a exclusão foi bem-sucedida
        if (response.ok) {
          toast.success('Usuário excluído com sucesso');
          getUsers(); // Atualiza a lista de usuários após a exclusão
          setUsuarioId(null); //limpa ID após exclusão 
        } else {
          toast.error('Ocorreu um erro ao excluir o usuário');
        }
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        toast.error('Erro ao excluir o usuário');
      }
    } else {
      // Se o usuário cancelar, exibe a mensagem de que a exclusão foi cancelada
      toast.info('Exclusão cancelada');
      setTimeout(() => toast.dismiss(), 3000); //tempo de 3 segundos 
    }
  };


  //função para abrir modal 
  const openModal = () => setIsModalOpen(true)

  //função fechar modal 
  const closeModal = () => setIsModalOpen(false);


  //rendederização de tabela
  return (
    <div className={style.mainscreen}>

      <form onSubmit={handleSubmit} className={style.sidemenu} id="sidemenu" >

        <div className={style.lateral}>
          <label className={style.label}>Menu Lateral</label>
        </div>

        <a href='http://localhost:3000/cadastro' className={style.a}>Lista de Cadastro</a>
        <a type='#' className={style.a}>Edição de Cadastro</a>
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
            className={style.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}>

          </input>
          <button className={style.buttonsave} onClick={handleSubmit}>Salvar</button>
        </div>
        <table className={style.maintable}>
          <thead>
            <tr>
              <th className={style.id}>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td className={style.td}>{item.id}</td>
                  <td className={style.td}>{item.nome}</td>
                  <td className={style.td}>{item.acoes}

                    <button id='openModalBtn'
                      className={style.editebutton}
                      onClick={() => {
                        setUsuarioId(item.id);
                        setNome(item.nome);
                        openModal();
                      }}
                    >Editar
                    </button>

                    <button
                      type='button'
                      className={style.excluirbutton}
                      onClick={() => deleteUser(item.id)}
                    >Excluir
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal de edição */}
      {isModalOpen && (
        <div className={style.modalOverLay}>
          <div className={style.modalConteudo}>

            {/* Botão para fechar o modal */}
            <span onClick={closeModal} className={style.closeX}>&times;</span>

            <h2 className={style.h2}>Edição de Cadastros</h2>

            <form>
              <div className={style.modalGroup}>
                <label className={style.modalLabel}>Nome do usuário:</label>
                <input type="text" className={style.modalInput} />
              </div>

              {/* Botões de ação */}
              <div className={style.modalActions}>
                <button type="button" className={style.buttonCancelw} onClick={updateUser}>
                  Cancelar
                </button>
                <button type="button" className={style.buttonSavew} onClick={closeModal}>
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
