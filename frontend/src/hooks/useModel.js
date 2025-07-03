import { useState, useEffect, useCallback, use } from 'react';

export const useModel = (initialState = false) => {
    const [showModal, setShowModal] = useState(initialState);

    const openModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return {
        showModal,
        openModal,
        closeModal,
        setShowModal
    }

}