import {
  createContext,
  FC,
  forwardRef,
  ReactNode,
  useRef,
  useState,
} from "react";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useOnclickOutside } from "@src/hooks/useOnclickOutside.ts";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextValue {
  pushModal: (content: ReactNode) => string;
  closeModal: (key: string) => void;
  clearAll: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
  pushModal: () => "",
  closeModal: () => {},
  clearAll: () => {},
});

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const modalSeqRef = useRef(0);
  const [modals, setModals] = useState<{ key: string; element: ReactNode }[]>(
    [],
  );
  const [activeModalKeys, setActiveModalKeys] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useOnclickOutside(modalContainerRef, () => clearAll());

  const pushModal = (modalContent: ReactNode) => {
    const key = `${modalSeqRef.current++}`;
    setModals((prev) => [...prev, { key, element: modalContent }]);
    setActiveModalKeys((prev) => [...prev, key]);
    return key;
  };
  const closeModal = (targetKey: string) => {
    setActiveModalKeys((prev) => prev.filter((key) => key !== targetKey));
    setModals((prev) => prev.filter(({ key }) => key !== targetKey));
  };

  const clearAll = () => {
    setActiveModalKeys([]);
    setModals([]);
  };

  return (
    <ModalContext.Provider value={{ pushModal, closeModal, clearAll }}>
      {!!activeModalKeys.length && (
        <ModalParent>
          {modals.map((modal) => (
            <ModalContainer key={modal.key} ref={modalContainerRef}>
              {modal.element}
            </ModalContainer>
          ))}
        </ModalParent>
      )}
      {children}
    </ModalContext.Provider>
  );
};

const ModalParent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        css={css`
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background: rgba(0, 0, 0, 0.59);
        `}
      >
        {children}
      </div>
    );
  },
);

const ModalContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        css={css`
          background: #fff;
          border-radius: 4px;
        `}
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          damping: 30,
          duration: 0.05,
          stiffness: 400,
        }}
      >
        {children}
      </motion.div>
    );
  },
);
