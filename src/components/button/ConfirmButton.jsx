const ConfirmButton = ({onClick, childreen}) => {
    return (
        <button 
        onClick={onClick}
        className="min-w-[100px] min-h-[40px] max-w-[600px] w-full text-white rounded-[4px] bg-blue-500 cursor-pointer">
            {childreen||"Continuar"}
        </button>
    );
};

export default ConfirmButton;
