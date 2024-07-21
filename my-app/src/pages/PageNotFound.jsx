import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            backgroundColor: '#f8f9fa', 
            textAlign: 'center' 
        }}>
            <h1 style={{ 
                color: '#ff6347', 
                fontSize: '3em', 
                marginBottom: '20px' 
            }}>
                This feature is yet to come
            </h1>
            <img 
                src='c-soon-2.jpg' 
                alt='Coming Soon' 
                style={{ 
                    height: '60vh', 
                    marginBottom: '30px', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                }} 
            />
            <button 
                onClick={() => navigate("/#")} 
                style={{
                    padding: '15px 30px',
                    fontSize: '1.2em',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Go Back To Home Page
            </button>
        </div>
    );
}

export default PageNotFound;