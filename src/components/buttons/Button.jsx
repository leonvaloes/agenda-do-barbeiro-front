const ConfirmButton = ({onClick, childreen}) => {
    return (
        <button 
        onClick={onClick}
        className="min-w-[100px] min-h-[40px] max-w-[100px] text-white rounded-[4px] bg-blue-500 cursor-pointer">
            {childreen}
        </button>
    );
};

export default ConfirmButton;
