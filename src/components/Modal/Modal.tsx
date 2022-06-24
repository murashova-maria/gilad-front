import { IModal } from "./types"
import styled from "styled-components"
import React, { useEffect, useRef, useCallback } from "react";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    backdrop-filter: blur(20px);
`

const Modal = ({children, show, onClose}: IModal): JSX.Element | null => {
    const wrapper = useRef<HTMLDivElement>(null);

    const onDismiss = (e: any) => {
        if (wrapper.current === e.target) onClose()
    }

    useEffect(()=> {
        const element = wrapper.current
        if (element) {
            element.addEventListener('click', onDismiss);
            return () => {
                element.removeEventListener('click', onDismiss);
            };
        }
    }, [onDismiss, wrapper])



    if (!show) return null
    return (
        <ModalWrapper ref={wrapper}>
            {children}
        </ModalWrapper>
    )
}

export default Modal