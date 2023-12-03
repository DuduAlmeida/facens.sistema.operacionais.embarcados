// components/Login.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', type: '' });

  const openModal = (message, type) => {
    setModalContent({ message, type });
    setModalIsOpen(true);
    setTimeout(() => closeModal(), 3000); // Fecha o modal após 3 segundos
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent({ message: '', type: '' });
  };

  const authenticate = async () => {
    try {
      // Simulando uma solicitação à API
      // Substitua isso pela lógica real de chamada à API
      const success = Math.random() > 0.5;

      if (success) {
        openModal('Autenticação bem-sucedida!', 'success');
        // Adicione lógica para armazenar o token no estado/global state da sua aplicação
      } else {
        throw new Error('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      openModal(error.message, 'error');
      console.error('Erro de autenticação:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate();
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: '#646cff' }}>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}
      >
        <label style={{ margin: '10px 0', color: '#646cff' }}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ margin: '10px 0', color: '#646cff' }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button type="submit" style={{ backgroundColor: '#646cff', color: 'white', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: modalContent.type === 'success' ? '#4CAF50' : '#F44336',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            borderRadius: '8px',
            border: 'none',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <p style={{ margin: '0', fontSize: '16px' }}>{modalContent.message}</p>
      </Modal>
    </div>
  );
};

export default Login;
