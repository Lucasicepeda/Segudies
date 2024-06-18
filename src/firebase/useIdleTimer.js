import { useEffect } from 'react';

const useIdleTimer = (timeout, onIdle) => {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(onIdle, timeout);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Eventos para monitorear la actividad del usuario
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Establecer el temporizador inicial
    resetTimer();

    // Limpiar eventos y temporizador cuando el componente se desmonta
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [timeout, onIdle]);
};

export default useIdleTimer;
