import style from './style.module.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

//exportação de função
export function Form() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
  });
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [usuarioId, setUsuarioId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); //controle do modal 
  const [correntUser, sitCurrentUser] = useState(null); //armazenar usuario para edição

  const navigation = useNavigate()

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

  //função para constrolar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  //função para input salvar e não salvar
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nome, sobrenome, telefone)
    if (!nome || !sobrenome || !telefone) {
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
          telefone,
          sobrenome,
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
      setSobrenome('');
      setTelefone('');
    } catch (error) {
      console.error('Error', error)
      toast.error('Ocorreu um erro ao salvar os dados')
    }

  }; 


  //função de salvar modal e alterar na tabela 
  
  const updateUser = async () => {
    // Validação dos campos
    if (!nome.trim() || !sobrenome.trim() || !telefone.trim()) {
      toast.error('Preencha todos os campos antes de salvar.');
      return;
    }
  
    try {
      // Requisição para atualizar o usuário
      const response = await fetch(`http://localhost:3333/cadastro/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          sobrenome: sobrenome.trim(),
          telefone: telefone.trim(),
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
          user.id === usuarioId ? { ...user, nome, sobrenome, telefone } : user
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

        <a type='#' className={style.a}>Edição de usuários</a>
        <a type='#' className={style.a}>Listas de Cadastros</a>
        <a type='#' className={style.a}>Registros de cadastros</a>

      </form>

      <div className={style.mainpanel}>
        <strong>
          <label className={style.cadastre}>Cadastro de usuário</label>
        </strong>

        <div>
          <label className={style.name}>Nome:</label>
          <input
            className={style.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}>
          </input>
        </div>

        <div>
          <label className={style.name}>Sobrenome:</label>
          <input
            className={style.input}
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}>
          </input>
        </div>

        <div>
          <label className={style.name}>Telefone:</label>
          <input
            type='number'
            className={style.input} value={telefone}
            onChange={(e) => setTelefone(e.target.value)}>
          </input>
        </div>
        <button className={style.buttonsave} onClick={handleSubmit}>Salvar</button>

        <table className={style.maintable}>
          <thead>
            <tr>
              <th className={style.id}>ID</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td className={style.td}>{item.id}</td>
                  <td className={style.td}>{item.nome}</td>
                  <td className={style.td}>{item.sobrenome}</td>
                  <td className={style.td}>{item.telefone}</td>
                  <td className={style.td}>{item.acoes}

                    <button id='openModalBtn'
                      className={style.editebutton}
                      onClick={() => {
                        setUsuarioId(item.id);
                        setNome(item.nome);
                        setSobrenome(item.sobrenome);
                        setTelefone(item.telefone);
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

      {/*modal de edição */}
      {isModalOpen && (
        <body>
          <div className={style.modalOverLay}>
            <div className={style.modalconteudo}>

              <span id='closeModalBtn' onClick={closeModal} className={style.closeX}>
                &times;</span> {/*X fecha modal*/}

              <h2 className={style.h2}>Edição de cadastros:</h2>

              <label className={style.modallabel}>Nome:</label>
              <input type="text" className={style.modalinput} />

              <label className={style.modallabel}>Sobrenome:</label>
              <input type='text' className={style.modalinput} />

              <label className={style.modallabel}>Telefone:</label>
              <input type='number' className={style.modalinput} />

              <button className={style.buttonsalve} onClick={updateUser}>Salvar</button>
              <button onClick={closeModal} className={style.buttoncancel}>Cancelar</button> {/*apertar em cancelar também fecha o modal*/}
            </div>
          </div>
        </body>
      )}

    </div>

  );
}

export default Form;
