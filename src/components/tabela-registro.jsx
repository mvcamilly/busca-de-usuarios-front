import style from './tabela-registro.module.css'


function TabelaRegistro({editData, setUsuarioID, deleteUser,}) {
    return(
        <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>IBGE</th>
            <th>Ações</th>
          </tr>
        </thead>
    
        <tbody>
          {editData.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.ibge}</td>
                <td>
                  <button onClick={() => setUsuarioID(item.id)}>Editar</button>
                  <button type='button' onClick={() => deleteUser(item.id)}>Deletar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
   
}

export {TabelaRegistro}