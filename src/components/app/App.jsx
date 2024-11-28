// import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import {modal} from 'modaledit.jsx'

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
  const [telefone, setTelefone] = useState([0]);
  const [usuarioId, setUsuarioId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); //controle do modal 

  const navigation = useNavigate()

  //função de buscar usuario
  function getUsers() {
    fetch('http://localhost:3333/cadastro')
      .then(response => response.json())
      .then(response => setData(response))
  }


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


  //função excluir usuario 
  const deleteUser = async (id) => {
    // Exibe a caixa de confirmação
    const confirmDelete = window.confirm('Tem certeza que deseja excluir o usuário?');
    if (confirmDelete) {
      // Se o usuário confirmar a exclusão, realiza a requisição para excluir o usuário
      try {
        const response = await fetch(`http://localhost:3333/cadastro/${id}`, { method: 'DELETE' });
        
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
          <input type="search" className={style.sideentrance} value={formData.text} onChange={handleChange} />
        </div>

        <a type='#' className={style.a}>Geral</a>
        <a type='#' className={style.a}>Cadastros</a>
        <a type='#' className={style.a}>Registros</a>

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
              <input type="search" className={style.modalinput} />

              <label className={style.modallabel}>Sobrenome:</label>
              <input type='text' className={style.modalinput} />

              <label className={style.modallabel}>Telefone:</label>
              <input type='number' className={style.modalinput} />

              <button className={style.buttonsalve}>Salvar</button>
              <button onClick={closeModal} className={style.buttoncancel}>Cancelar</button> {/*apertar em cancelar também fecha o modal*/}
            </div>
          </div>
        </body>
      )}


    </div>

  );
}

export default Form;
