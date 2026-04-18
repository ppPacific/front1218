
import { X } from "lucide-react";
const Modal = ({children}) => {

    return (
        <div className={"max-h-[90%] fixed top-0 w-full flex flex-col z-60 overflow-y-auto bg-white"}>
            {children}
        </div>
    )
}

export default Modal
