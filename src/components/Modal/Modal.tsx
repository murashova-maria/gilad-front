import { IModal } from "./types"
import styled from "styled-components"
import React, { useEffect, useRef, useCallback } from "react";
import { useAppActions } from "../../store/app/hooks";

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    padding: 50px;
    z-index: 1000;
`

const Modal = ({children,  onClose}: IModal): JSX.Element | null => {
    const wrapper = useRef<HTMLDivElement>(null);

    const onDismiss = (e: any) => {
        if (wrapper.current === e.target) onClose()
    }

    //Set modal open in global state
    const { onSetModalOpen } = useAppActions()
    useEffect(() => {
        onSetModalOpen(true)
        return () => onSetModalOpen(false)
    }, [])

    useEffect(()=> {
        const element = wrapper.current
        if (element) {
            element.addEventListener('click', onDismiss);
            return () => {
                element.removeEventListener('click', onDismiss);
            };
        }
    }, [onDismiss, wrapper])



    return (
        <ModalWrapper ref={wrapper}>
            {children}
        </ModalWrapper>
    )
}

export default Modal