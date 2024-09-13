import style from "./modal.module.css"

function AlteraDados() {
    return(
        <div>

            <h2>Alterar Dados</h2>

            <strong>
              <label>Nome</label>

              <input type="text" value={newName} onChange={(e) => setnewName(e.target.value)}></input>

              <label >CPF</label>
            </strong>
            <input type="number" value={newName} onChange={(e) => setnewName(e.target.value)}></input>

            <button onClick={() => updateUsuarios(usuarioId)}>Salvar</button>
            <button onClick={() => setUsuarioID()}>Cancelar</button>
          </div>
    )
}

export {AlteraDados}