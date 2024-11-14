import style from './style.module.css'

function editar() { 
    return(
  
        <div>
            <h2>editar dados do ususario</h2>

            <label>nome</label>
            <input></input>
            <label>sobrenome</label>
            <input></input>
            <label>telefone</label>
            <input></input>

            <button>salvar</button>
            <button>cancelar</button>
        </div>
    )
}

export {editar}