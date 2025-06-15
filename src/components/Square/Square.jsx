import './Square.scss'

export default function Square({ value, onSquareClick }) {
    return (
        <button onClick={onSquareClick} className="square">{value}</button>
    )
}
