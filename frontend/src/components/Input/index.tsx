import { FC, InputHTMLAttributes } from "react";
const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
    return <input {...props} className="bg-red-200" />
}
export default Input;