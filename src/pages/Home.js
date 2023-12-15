import React from 'react';
import useWindowSize from '../hooks/useWindowSize';

const Home = () => {
    const windowSize = useWindowSize();
    return (
        <div className="text-center flex_center" style={{ minHeight: '70vh' }}>
            {windowSize.width > 768 ? (
                <h1
                    className={`mb-3 fw-bolder text-capitalize  d-flex  gap-4 text-primary`}
                    style={{
                        fontSize: '60px',
                        position: 'relative',
                        left: '-10px',
                    }}
                >
                    <span className="text-white">Welcome</span>to Notes
                </h1>
            ) : (
                <h1
                    className={`mb-3 fw-bolder text-capitalize  d-flex  gap-4 text-white
          `}
                    style={{
                        fontSize:
                            windowSize.width < 576
                                ? '35px'
                                : windowSize.width > 576
                                ? '40px'
                                : '',
                        position: 'relative',
                        left: '-5px',
                    }}
                >
                    Welcome to Notes
                </h1>
            )}
        </div>
    );
};

export default Home;
