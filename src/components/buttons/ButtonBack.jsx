import { BsArrow90DegLeft } from "react-icons/bs";

const ButtonBack = ({onClick, childreen}) => {
    return (
        <button 
        onClick={onClick}
        className="flex items-center min-w-[100px] min-h-[40px] max-w-[100px] text-gray-500 rounded-[4px] cursor-pointer">
            <BsArrow90DegLeft className="mr-2"/>
            {childreen}
        </button>
    );
};

export default ButtonBack;
