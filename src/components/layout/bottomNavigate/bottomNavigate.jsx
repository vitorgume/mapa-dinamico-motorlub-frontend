import './bottomNavigate.css';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigate() {
    const location = useLocation();

    return (
        <div className='bottom-navigate'>
            <nav className="bottom-nav">

                <Link
                    to="/menu"
                    className={`nav-item ${location.pathname === '/menu' ? 'active' : ''}`}
                >
                    <i className="fas fa-map-marked-alt nav-icon"></i>
                    <span>Mapa</span>
                </Link>

                <Link
                    to="/pipeline"
                    className={`nav-item ${location.pathname === '/pipeline' ? 'active' : ''}`}
                >
                    <i className="fas fa-list nav-icon"></i>
                    <span>Pipeline</span>
                </Link>

                <Link
                    to="/estatisticas"
                    className={`nav-item ${location.pathname === '/estatisticas' ? 'active' : ''}`}
                >
                    <i className="fas fa-chart-pie nav-icon"></i>
                    <span>Estatísticas</span>
                </Link>
            </nav>
        </div>
    );
}