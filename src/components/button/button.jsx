const Button = ({onClick, childreen}) => {
    return (
        <button 
        onClick={onClick}
        className="w-full min-h-[80px] bg-blue-600">
            {childreen||"Continuar"}
        </button>
    );
};

export default Button;
