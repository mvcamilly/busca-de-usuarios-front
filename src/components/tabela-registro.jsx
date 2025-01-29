import style from './tabela-registro.module.css'


function TabelaRegistro({ editData = [] }) {
  return (
      <table>
          <tbody>
              {editData.map((item) => (
                  <tr key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
}

export {TabelaRegistro}