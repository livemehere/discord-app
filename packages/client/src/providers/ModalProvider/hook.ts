import { useContext } from "react";
import { ModalContext } from "@src/providers/ModalProvider/Provider.tsx";

export const useModal = () => useContext(ModalContext);
