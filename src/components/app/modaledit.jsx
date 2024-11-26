import style from './style.module.css'

function editar() {
    return (

        <div>
            <title>editar dados do ususario</title>

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

export { editar }