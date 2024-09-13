import styles from './styles.module.css'

function MenuLateral() {
    return (
        <div className={styles.container}>
            <label>Menu Lateral</label>
            <input type='search' ></input>
            <a href='http://localhost:3000/cadastro'>Lista de cadastro IBGE</a>
            <a href='#'>2 botão de menu</a>
            <a href='#'>3 botão de menu</a>
        </div>
    )
}

export { MenuLateral }